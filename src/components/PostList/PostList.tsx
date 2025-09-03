import { memo } from "react";
import { PostItem } from "../PostItem";
import type {Post} from '@/types/Post';
import styles from './postlist.module.css';

type PostListProp = {
    posts: Array<Post>
    title: string
};

export const PostList = memo(({posts, title}: PostListProp) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}> {title}</h1>
            {posts.map((post) => 
                <PostItem post={post} key={post.id}/>
            )}
        </div>
    );
});
