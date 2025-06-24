import { useEffect, useState, useRef } from 'react';

import SectionTitle from '@/components/section-title';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { supabase } from '@/lib/supabase';
import { generateRandomNickname } from '@/lib/generateRandomNickname';
import { formatCommentDate } from '@/lib/formatCommentDate';
import Dialog from '@/components/dialog';
import Button from '@/components/button';

type Comment = {
  id: string;
  text: string;
  name: string;
  created_at: string;
};

export default function CommentsSection() {
  const [inputCommentValue, setInputCommentValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // 다이얼로그
  const [isOpen, setIsOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // gsap
  const containerRef = useRef<HTMLDivElement>(null!);
  useGsapFadeInOnScroll(containerRef);

  // 다이얼로그 열기 함수
  const openDialog = (message: string) => {
    setDialogMessage(message);
    setIsOpen(true);
  };

  // input value
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCommentValue(e.target.value);
  };

  // button click
  const onClickRegisterButton = async () => {
    if (!inputCommentValue.trim()) {
      openDialog('댓글을 입력해 주세요.');
      return;
    }

    const randomNickname = generateRandomNickname();

    const { error } = await supabase
      .from('comments')
      .insert([{ name: randomNickname, text: inputCommentValue }]);

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
      .select('id, text, name, created_at')
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

  return (
    <section className="px-6 py-20">
      <div ref={containerRef} className="m-auto flex max-w-4xl flex-col gap-12">
        <header className="gsap-fade-in flex flex-col gap-4 text-center">
          <SectionTitle title="Comments" className="text-primary-darker" />
          <div className="text-primary-darker text-sm">
            <p>제 포트폴리오를 잘 보셨다면, 한 마디 남겨주세요!</p>
            <p>여러분의 한 마디는 제게 큰 힘이 됩니다!</p>
          </div>
        </header>
        <div className="gsap-fade-in m-auto flex w-full flex-col gap-8 sm:max-w-lg">
          <div
            className={`focus-within:ring-primary/50 flex items-center gap-2 rounded-full border-4 border-white bg-white pl-3 focus-within:ring-2`}
          >
            <span aria-hidden className="text-2xl">
              🥹
            </span>
            <input
              type="text"
              placeholder="텍스트를 입력해 주세요."
              value={inputCommentValue}
              onChange={onChangeComment}
              className="h-10 grow outline-none"
            />
            <Button
              shape="circle"
              onClick={onClickRegisterButton}
              className="h-10"
            >
              등록
            </Button>
          </div>
          {comments.length === 0 ? (
            <div className="text-primary-darker flex flex-col items-center rounded-lg bg-white py-4">
              <p>아직 아무 얘기도 없네요. 🥲</p>
              <p>첫 번째 한 마디를 남겨주세요!</p>
            </div>
          ) : (
            <ul className="border-primary-lighter flex flex-col gap-2">
              {comments.map((comment) => {
                const avatarUrl = `https://api.dicebear.com/9.x/big-smile/svg?seed=${comment.id}`;

                return (
                  <li
                    key={comment.id}
                    className="flex flex-col gap-2 rounded-lg bg-white p-4"
                  >
                    <dl className="text-primary-darkest grid grid-cols-[auto_1fr] items-center gap-x-3 text-sm">
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
                        <dd>{formatCommentDate(comment.created_at)}</dd>
                      </div>
                    </dl>
                    <p className="w-10/12 text-base">{comment.text}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* 다이얼로그 컴포넌트 */}
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 className="mb-4 text-lg font-bold">⚠️ comments 알림</h3>
        <p className="mb-4">{dialogMessage}</p>
        <Button onClick={() => setIsOpen(false)} className="float-right">
          확인
        </Button>
      </Dialog>
    </section>
  );
}
