import React, { useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type ChildName =
  | 'Дея'
  | 'Иван'
  | 'Саша'
  | 'Никита'
  | 'Злата'
  | 'Алиса'
  | 'Агния'
  | 'Кирилл'
  | 'Ая'
  | 'Дима'
  | 'Миша';

interface CopiedChild {
  name: ChildName;
  generatedText: string;
}

const TextGenerator: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [childName, setChildName] = useState<ChildName>('Дея');
  const [dynamicText, setDynamicText] = useState<string>('');
  const [completedText, setCompletedText] = useState<string>('');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [copiedChildren, setCopiedChildren] = useState<CopiedChild[]>([]);
  const [finalText, setFinalText] = useState<string>('');

  const getParentName = (name: ChildName): string => {
    switch (name) {
      case 'Дея':
        return 'Владимир';
      case 'Иван':
        return 'Елена';
      case 'Саша':
        return 'Мария';
      case 'Никита':
        return 'Анастасия';
      case 'Злата':
        return 'Ирина';
      case 'Алиса':
        return 'Ксения';
      case 'Агния':
        return 'Юлия';
      case 'Кирилл':
        return 'Андрей';
      case 'Ая':
        return '...';
      case 'Дима':
        return 'Александра';
      case 'Миша':
        return 'Дарина';
      default:
        return '';
    }
  };

  const generateText = () => {
    const parentNameToShow = getParentName(childName);
    const greeting = `${parentNameToShow}, здравствуйте! Я к вам с еженедельным отчётом!`;
    const thisWeek = `На этой неделе ${childName}`;
    const weCompleted = ` Мы проходили: ${completedText}`;

    const fullText = `${greeting}\n${thisWeek}\n${dynamicText}.\n${weCompleted}.`;

    setGeneratedText(fullText);
    setCopied(false);
  };

  const generatedTextRef = useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    if (copied) {
      const textToCopy = generatedTextRef.current?.textContent || '';
      const cleanedText = textToCopy.trim();
      setCopiedChildren((prevCopiedChildren) => [
        ...prevCopiedChildren,
        { name: childName, generatedText: cleanedText },
      ]);
    }
  }, [copied, childName]);

  const handleCopy = () => {
    const textToCopy = generatedTextRef.current?.textContent || '';
    const cleanedText = textToCopy.trim();
    navigator.clipboard.writeText(cleanedText).then(() => {
      setCopied(true);
    });
  };

  const setCopiedClean = () => {
    setFinalText('');
    setCopiedChildren([]);
  };

  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <div className="w-[600px] p-4 border rounded-lg shadow-lg bg-white p-10">
        <div className="mb-4">
          <p className="text-lg font-semibold mb-5"> Имя Родителя: {getParentName(childName)}</p>
          <label htmlFor="childName" className="text-lg font-semibold">
            Имя ребёнка:
          </label>
          <select
            id="childName"
            value={childName}
            onChange={(e) => {
              setCopied(false);
              setChildName(e.target.value as ChildName);
            }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            {[
              'Дея',
              'Иван',
              'Саша',
              'Никита',
              'Злата',
              'Алиса',
              'Агния',
              'Кирилл',
              'Ая',
              'Дима',
              'Миша',
            ].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dynamicText" className="text-lg font-semibold">
            На этой неделе {childName}
          </label>
          <textarea
            id="dynamicText"
            placeholder="Сюда написать как ребёнок себя вёл и чувствовал"
            value={dynamicText}
            onChange={(e) => setDynamicText(e.target.value)}
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
          />
          <label htmlFor="completed" className="text-lg font-semibold">
            Мы проходили:
          </label>
          <textarea
            id="Мы проходили"
            value={completedText}
            placeholder="Сюда написать то, что мы проходили и не тратить на это много слов"
            onChange={(e) => setCompletedText(e.target.value)}
            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 h-40"
          />
        </div>
        <button
          onClick={generateText}
          className="w-full py-2 mt-2 text-white bg-blue-500 border border-blue-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
          Сгенерировать текст
        </button>

        {generatedText && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Готовый текст:</h2>
            <p className="mt-4" ref={generatedTextRef}>
              {generatedText}
            </p>
            <CopyToClipboard text={generatedTextRef.current?.textContent || ''} onCopy={handleCopy}>
              <button
                onClick={handleCopy}
                className={`mt-4  py-2 px-2 mt-2 text-white ${
                  copied ? 'bg-green-500' : 'bg-blue-500'
                } border border-${copied ? 'green-600' : 'blue-600'} rounded-md hover:bg-${
                  copied ? 'green-600' : 'blue-600'
                } focus:outline-none focus:ring focus:border-${copied ? 'green-300' : 'blue-300'}`}>
                {copied ? 'Скопирован!' : 'Скопировать для отправки'}
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>
      {copiedChildren.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Скопированные имена детей:</h2>
          <ul className="grid grid-cols-2 gap-4">
            {copiedChildren.map((child, index) => (
              <li
                key={index}
                className="p-2 text-lg bg-gray-100 rounded-md shadow hover:bg-yellow-600 hover:text-white hover:cursor-pointer"
                onClick={() => {
                  setFinalText(child.generatedText);
                }}>
                {child.name}
              </li>
            ))}
          </ul>
          <button
            onClick={setCopiedClean}
            className="w-full py-2 mt-4 mb-4 text-white bg-red-600 border border-white-600 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:border-blue-300">
            Очистить список
          </button>
        </div>
      )}
      <p className="pb-5  text-xl">{finalText}</p>
    </div>
  );
};

export default TextGenerator;
