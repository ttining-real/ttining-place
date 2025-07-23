import { useEffect, useState } from 'react';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Button from '@/components/button';
import Dialog from '@/components/dialog';
import { supabase } from '@/lib/supabase';
import { generateRandomNickname } from '@/lib/generateRandomNickname';
import { formatDate } from '@/lib/formatDate';

type Comment = {
  id: string;
  user_id: string;
  text: string;
  name: string;
  created_at: string;
};

const USER_ID_KEY = 'comments_user_id';

export default function CommentsSection() {
  const [userId, setUserId] = useState<string | null>(null);
  const [inputCommentValue, setInputCommentValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [targetCommentId, setTargetCommentId] = useState<string | null>(null);

  // 다이얼로그
  const [isOpen, setIsOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState<'alert' | 'confirm'>('alert');

  // 코멘트 표시 개수
  const [visibleCount, setVisibleCount] = useState(4);

  // 표시할 댓글 목록
  const visibleComments = comments.slice(0, visibleCount);

  // 컴포넌트 마운트 후 userId 세팅
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let storedUserId = localStorage.getItem(USER_ID_KEY);
      if (!storedUserId) {
        storedUserId = crypto.randomUUID();
        localStorage.setItem(USER_ID_KEY, storedUserId);
      }
      setUserId(storedUserId);
    }
  }, []);

  // 다이얼로그 열기
  const openDialog = (message: string, type: 'alert' | 'confirm' = 'alert') => {
    setDialogMessage(message);
    setDialogType(type);
    setIsOpen(true);
  };

  // comment 입력 핸들러
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCommentValue(e.target.value);
  };

  // 등록 버튼
  const onClickRegisterButton = async () => {
    if (!inputCommentValue.trim()) {
      openDialog('댓글을 입력해 주세요.');
      return;
    }

    if (!userId) {
      openDialog('사용자 정보가 없습니다. 잠시 후 다시 시도해 주세요.');
    }

    const randomNickname = generateRandomNickname();

    const { error } = await supabase
      .from('comments')
      .insert([
        { name: randomNickname, text: inputCommentValue, user_id: userId },
      ]);

    if (error) {
      console.error('댓글 등록 실패 : ', error);
      openDialog('댓글 등록에 실패했습니다. 다시 시도해 주세요.');
    } else {
      // 등록 성공 : 상태 초기화 + 새로 고침
      setInputCommentValue('');
      fetchComments();
    }
  };

  // data fetch
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('id, user_id, text, name, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('댓글 가져오기 실패 : ', error);
      openDialog('댓글을 가져오는데 실패했습니다.');
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 댓글 삭제 (id 기준)
  const onClickDeleteComment = async (commentId: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.error('댓글 삭제 실패 : ', error);
      openDialog('댓글 삭제에 실패했습니다. 다시 시도해 주세요.');
    } else {
      fetchComments();
    }
  };

  if (!userId) {
    // userId 준비 전 로딩 혹은 빈 화면 처리
    return null;
  }

  return (
    <>
      <SectionLayout innerClassName="grid md:grid-cols-2 gap-10">
        <header className="flex flex-row items-center justify-between gap-4 md:flex-col md:justify-center">
          <h2 className={`${montserrat.className} text-2xl font-bold`}>
            Comments
          </h2>
          <div className="text-text-secondary text-right text-sm md:text-center">
            <p>방문해 주셔서 감사합니다!</p>
            <p>자유롭게 코멘트를 남겨주세요.</p>
          </div>
        </header>
        <div className="flex flex-col gap-4">
          <div className="focus-within:ring-primary-light/60 bg-surface border-border flex items-center justify-between gap-2 rounded-4xl border p-1 shadow-md focus-within:ring-2">
            <span aria-hidden className="pl-3 text-lg">
              🥹
            </span>
            <input
              type="text"
              placeholder="코멘트를 작성해 주세요."
              value={inputCommentValue}
              onChange={onChangeComment}
              className="w-full grow outline-none"
            />
            <Button onClick={onClickRegisterButton} className="shrink-0">
              등록
            </Button>
          </div>
          {comments.length === 0 ? (
            <div className="text-text-primary border-border bg-surface flex flex-col items-center rounded-lg border py-4">
              <p>아직 아무 얘기도 없네요. 🥲</p>
              <p>첫 번째 한 마디를 남겨주세요!</p>
            </div>
          ) : (
            <div className="flex max-h-[300px] flex-col items-center gap-4 overflow-auto">
              <ul className="flex w-full flex-col gap-4 p-1">
                {visibleComments.map((comment) => {
                  const avatarUrl = `https://api.dicebear.com/9.x/big-smile/svg?seed=${comment.user_id}`;
                  const isMyComment = comment.user_id === userId;

                  return (
                    <li
                      key={comment.id}
                      className="border-border bg-surface relative flex flex-col gap-2 rounded-xl border p-4 shadow-md"
                    >
                      <dl className="text-text-secondary grid grid-cols-[auto_1fr] items-center gap-x-3 text-sm">
                        <div className="row-span-2">
                          <dt className="sr-only">프로필 이미지</dt>
                          <dd>
                            <img
                              src={avatarUrl}
                              alt={`${comment.name} 프로필`}
                              width={40}
                              height={40}
                              loading="lazy"
                              className="h-10 w-10 rounded-full"
                            />
                          </dd>
                        </div>

                        <div>
                          <dt className="sr-only">작성자</dt>
                          <dd>{comment.name}</dd>
                        </div>

                        <div className="col-start-2 text-[13px]">
                          <dt className="sr-only">작성일</dt>
                          <dd>{formatDate(comment.created_at, 'dash')}</dd>
                        </div>
                      </dl>
                      <p className="w-10/12 text-base">{comment.text}</p>

                      {/* 내가 작성한 댓글일 때만 삭제 버튼 표시 */}
                      {isMyComment && (
                        <Button
                          variants="tertiary"
                          size="sm"
                          isIconOnly
                          iconId="close"
                          ariaLabel="댓글 삭제"
                          onClick={() => {
                            setTargetCommentId(comment.id);
                            openDialog('댓글을 삭제하시겠습니까?', 'confirm');
                          }}
                          className="absolute top-2.5 right-2.5"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* 더 보기 버튼 */}
              {visibleCount < comments.length && (
                <Button
                  size="sm"
                  variants="secondary"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  댓글 더 보기
                </Button>
              )}
            </div>
          )}
        </div>

        {/* 다이얼로그 컴포넌트 */}
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h3 className="mb-4 text-lg font-bold">⚠️ comments 알림</h3>
          <p className="mb-4">{dialogMessage}</p>
          <div className="flex justify-end gap-2">
            {dialogType === 'confirm' && (
              <Button
                variants="secondary"
                onClick={() => {
                  setIsOpen(false);
                  setTargetCommentId(null);
                }}
              >
                취소
              </Button>
            )}
            <Button
              onClick={() => {
                if (dialogType === 'confirm' && targetCommentId) {
                  onClickDeleteComment(targetCommentId);
                  setTargetCommentId(null);
                }
                setIsOpen(false);
              }}
            >
              확인
            </Button>
          </div>
        </Dialog>
      </SectionLayout>
    </>
  );
}
