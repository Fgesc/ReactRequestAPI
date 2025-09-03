import type {Post} from '@/types/Post';
import styles from './postitem.module.css';
import { memo } from 'react';

type PostItemProps = {
    post: Post
};

export const PostItem = memo(({post}: PostItemProps) => {
    return (
        <div className={styles.post}>
            <div className={styles.num}>{post.id}.</div>
            <h3 className="post__title">{post.title}</h3>
            <div className="post__content">{post.body}</div>
        </div>
    );

});
