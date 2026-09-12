import { Fragment } from 'react';

/** 사전 문구의 '\n' 을 <br /> 로 바꿔 그린다 */
export default function Lines({ text }: { text: string }) {
  const parts = text.split('\n');
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
