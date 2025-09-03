import { useState, useEffect, useCallback } from 'react';
import { PostList } from './components/PostList';
import { useFetching } from './hooks/useFetching';
import PostService from './api/PostService';
import type {Post} from '@/types/Post';
import { Loader } from './ui/Loader';
import './App.css';

function App() {

    const [posts, setPosts] = useState<Post[]>([]);

    const loadPosts = useCallback(async () => {
        const newPosts = await PostService.getAll();
        setPosts(newPosts);
    }, []);

    const [fetchPosts, isPostLoading, postError] = useFetching( loadPosts);
    
    useEffect (() => {
        fetchPosts();

        const interval = setInterval(() =>  {
        fetchPosts(); 
        console.log('вызвалась с интервалом 5 секунд');
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            {postError &&  <h1>Произошла ошибка: {postError}</h1>}
            <PostList posts={posts} title="Список постов" />
            {isPostLoading && <Loader/>}
        </div>   
    );
};

export default App;
