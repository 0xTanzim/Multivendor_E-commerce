import parse from 'html-react-parser';

const TrainingContentHtml = ({ content }: { content: string }) => {
  return <article className="">{parse(`${content}`)}</article>;
};

export default TrainingContentHtml;
