import Header from '@/components/Header';
import ImageGenerator from '@/components/ImageDisplay';
import TextGenerator from '@/components/TextGenerator';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Header />
      <ImageGenerator />
      <TextGenerator />
    </div>
  );
}
