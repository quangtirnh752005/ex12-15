import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Abort the previous request when userId changes so an old response can't overwrite a new one.
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}?userId=${userId}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setPosts([]);
        setError(`Không tải được bài viết: ${err.message}`);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [userId]);

  if (isLoading) return <p className="muted">Loading posts of user {userId}...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="posts">
      {posts.map((post) => (
        <article key={post.id} className="post">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}

UserPosts.propTypes = {
  userId: PropTypes.number.isRequired,
};
