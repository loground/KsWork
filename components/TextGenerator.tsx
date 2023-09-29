import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TextGenerator = () => {
  const [copied, setCopied] = useState(false);

  const [childName, setChildName] = useState('Дея');
  const [dynamicText, setDynamicText] = useState('');
  const [completedText, setCompletedText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const getParentName = (childName: String) => {
    switch (childName) {
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

  const generatedTextRef = React.useRef<HTMLParagraphElement | null>(null);

  const handleCopy = () => {
    const textToCopy = generatedTextRef.current?.textContent || '';
    const cleanedText = textToCopy.trim();
    navigator.clipboard.writeText(cleanedText).then(() => setCopied(true));
  };

  return (
    <div className="flex flex-col items-center mt-20 h-screen">
      <div className="w-[500px] p-4 border rounded-lg shadow-lg bg-white">
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
              setChildName(e.target.value);
            }}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option value="Дея">Дея</option>
            <option value="Иван">Иван</option>
            <option value="Саша">Саша</option>
            <option value="Никита">Никита</option>
            <option value="Злата">Злата</option>
            <option value="Алиса">Алиса</option>
            <option value="Агния">Агния</option>
            <option value="Кирилл">Кирилл</option>
            <option value="Ая">Ая</option>
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
            <p className="mt-2" ref={generatedTextRef}>
              {generatedText}
            </p>
            <CopyToClipboard text={generatedTextRef.current?.textContent || ''} onCopy={handleCopy}>
              <button
                onClick={() => {
                  handleCopy;
                  console.log(generatedTextRef.current?.textContent);
                }}
                className={`py-2 mt-2 text-white ${
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
    </div>
  );
};

export default TextGenerator;
