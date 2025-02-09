'use client'

import React from 'react';
import Header from './components/header';
import PostForm from './components/post-form';



const QuestCreatePage = () => {
  return (
    <div className="min-h-screen py-16 container">
        <Header/>
        <PostForm/>
    </div>
  );
};

export default QuestCreatePage;
