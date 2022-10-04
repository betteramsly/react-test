import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllPosts, fetchPosts, increaseOffset } from '../../Features/posts/PostsSlice'
import { PostList } from '../PostList'
import styles from './Home.module.scss'

export const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [filterDate, setFilterDate] = useState({ from: '', to: '' })

  const dispatch = useDispatch()
  const { posts, limit, offset } = useSelector((state) => state.posts)

  const isFiltering = !!filterDate.from || !!filterDate.to || !!searchInputValue
  const isLoading = posts.status === 'loading'
  const isLastPage = limit + offset >= posts.total

  const searchedPosts = !!searchInputValue
    ? posts.allPosts.filter((post) => {
        return post.title?.toLowerCase().includes(searchInputValue.toLowerCase())
      })
    : []

  const dateFilteredPosts = posts.allPosts.filter((post) => {
    const { from, to } = filterDate
    const fromInMs = new Date(from).getTime()
    const toInMs = new Date(to).getTime()
    const postFormattedDate = new Date(post.date).getTime()
    if (from && !to) {
      return postFormattedDate >= fromInMs
    }
    if (to && !from) {
      return postFormattedDate <= toInMs
    }
    if (to && from) {
      return postFormattedDate >= fromInMs && postFormattedDate <= toInMs
    }
    return false
  })

  const postList = isFiltering ? [...searchedPosts, ...dateFilteredPosts] : posts.items

  React.useEffect(() => {
    dispatch(fetchPosts({ limit, offset }))
    dispatch(fetchAllPosts())
  }, [offset, limit])

  const onChangePage = () => {
    dispatch(increaseOffset())
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchInput}
          placeholder="Название поста"
          onChange={(e) => {
            setSearchInputValue(e.target.value)
            setFilterDate({ to: '', from: '' })
          }}
        />
      </div>
      <div className={styles.searchDateBox}>
        <input
          className={styles.dateInput}
          type="date"
          value={filterDate.from}
          onChange={(e) => {
            setFilterDate((prev) => ({ ...prev, from: e.target.value }))
            setSearchInputValue('')
          }}
        />
        <input
          type="date"
          value={filterDate.to}
          onChange={(e) => {
            setFilterDate((prev) => ({ ...prev, to: e.target.value }))
            setSearchInputValue('')
          }}
        />
      </div>
      <PostList posts={postList} />
      <div className={styles.loadMoreBtnBox}>
        {!isLastPage && !isLoading && !isFiltering && (
          <button
            className={styles.loadMoreBtn}
            onClick={() => {
              onChangePage()
            }}
          >
            Загрузить ещё
          </button>
        )}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  )
}
