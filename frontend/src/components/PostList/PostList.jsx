import React, { useState } from 'react'

import { Post } from '../../Features/post/Post'
import { AddPostModal } from '../AddPostModal'
import styles from './PostList.module.scss'

export const PostList = ({ posts }) => {
  const [addPostModalOpen, setAddPostModalOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.listTop}>
        <h1 className={styles.title}>Список постов ({posts?.length}):</h1>
        <button className={styles.addPostBtn} onClick={() => setAddPostModalOpen(true)}>
          Добавить пост
        </button>
      </div>
      <div className={styles.postList}>
        {posts?.map((obj) => (
          <Post key={obj.id} id={obj.id} date={obj.date} title={obj.title} />
        ))}
      </div>
      {addPostModalOpen && <AddPostModal open={addPostModalOpen} onClose={() => setAddPostModalOpen(false)} />}
    </div>
  )
}
