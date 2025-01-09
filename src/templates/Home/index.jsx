//import logo from './logo.svg';
//import { PostCard } from '../../components/PostCard';
import { Button } from '../../components/Button';
import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput'

class Home extends Component {
  state = {
    name: "Lucas",
    counter: 0,
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  };
  timeoutUpdate = null;

  handlePClick = () => {
    this.setState({ name: 'Silva' });
  }
  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 })
  }

  handleTimeOut() {
    const { posts, counter } = this.state;
    posts[0].title = 'Bem vindo!';
    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 })
    }, 1000);
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
    console.log(page, nextPage)
  }
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    }) : posts;

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (<h1>Search value: {searchValue}</h1>)}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && <p>Não há postes no momento.</p>}

        <div className="button-container">
          {!searchValue && (<Button text='Load more posts'
            onClickFunction={this.loadMorePosts}
            disabled={noMorePosts} />)}

        </div>
      </section>
    );
  }
}

export default Home;
