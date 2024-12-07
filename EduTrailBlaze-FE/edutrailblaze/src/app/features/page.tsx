
import WebHeader from '../../components/header';
import CreatePost from '../../components/test-redux/CreatePost/CreatePost';
import PostList from '../../components/test-redux/PostList/PostList';

export default function Blog() {
  // this is a server component
  return (
    <div className="p-5">
      <WebHeader/>
      <CreatePost />
      <PostList />
    </div>
  );
}
