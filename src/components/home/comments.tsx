import { useEffect, useState, useRef } from 'react';

import SectionTitle from '@/components/section-title';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { supabase } from '@/lib/supabase';
import { generateRandomNickname } from '@/lib/generateRandomNickname';
import { formatCommentDate } from '@/lib/formatCommentDate';

type Comment = {
  id: string;
  text: string;
  name: string;
  created_at: string;
};

export default function CommentsSection() {
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputCommentValue, setInputCommentValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  // input value
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value);
  };
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCommentValue(e.target.value);
  };

  // button click
  const onClickRegisterButton = async () => {
    console.log('등록 버튼 클릭');
    if (!inputNameValue.trim() || !inputCommentValue.trim()) {
      alert('이름과 댓글을 모두 입력해 주세요.');
      return;
    }

    const { error } = await supabase
      .from('comments')
      .insert([{ name: inputNameValue, text: inputCommentValue }]);

    if (error) {
      console.error('댓글 등록 실패 : ', error);
      alert('댓글 등록에 실패했습니다. 다시 시도해 주세요.');
    } else {
      // 등록 성공 : 상태 초기화 + 새로 고침
      setInputNameValue('');
      setInputCommentValue('');
      fetchComments();
    }
  };

  const onClickRandomName = () => {
    console.log('랜덤 생성 버튼 클릭!');
    const nickname = generateRandomNickname();
    setInputNameValue(nickname);
  };

  // data fetch
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('id, text,name, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('댓글 가져오기 실패 : ', error);
    } else {
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <section className="bg-primary-lighter px-6 py-20">
      <div ref={containerRef} className="m-auto flex max-w-4xl flex-col gap-12">
        <header className="gsap-fade-in flex flex-col gap-4 text-center">
          <SectionTitle title="Comments" />
          <p>잘 보셨나요? 한 마디 남겨주세요!</p>
        </header>
        <div className="gsap-fade-in flex flex-col gap-8">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-3/12">
              <input
                type="text"
                placeholder="이름"
                value={inputNameValue}
                onChange={onChangeName}
                className="w-full rounded-lg bg-white/60 px-4 py-2 pr-21"
              />
              <button
                onClick={onClickRandomName}
                className="text-success absolute right-3 h-full cursor-pointer px-1 text-sm"
              >
                랜덤 생성
              </button>
            </div>
            <input
              type="text"
              placeholder="텍스트를 입력해 주세요."
              value={inputCommentValue}
              onChange={onChangeComment}
              className="rounded-lg bg-white/60 px-4 py-2 sm:w-7/12"
            />

            <button
              onClick={onClickRegisterButton}
              className="bg-primary cursor-pointer rounded-lg px-4 py-2 text-white sm:w-2/12"
            >
              등록
            </button>
          </div>
          {comments.length === 0 ? (
            <div className="text-primary-darker flex flex-col items-center rounded-lg bg-white/20 py-4">
              <p>아직 아무 얘기도 없네요. 🥲</p>
              <p>첫 번째 한 마디를 남겨주세요!</p>
            </div>
          ) : (
            <ul className="border-primary-lighter flex flex-col gap-2">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="text-primary-darker flex items-center gap-4 rounded-lg bg-white/20 px-6 py-4"
                >
                  <span className="w-10/12 text-base">{comment.text}</span>
                  <span className="w-2/12 text-center text-sm">
                    {comment.name}
                  </span>
                  <span className="shrink-0 text-sm">
                    {formatCommentDate(comment.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
