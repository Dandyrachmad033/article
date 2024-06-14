import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { getArticle } from './apihandler';

function Userspage() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await getArticle();
                setArticles(fetchedArticles.data);
                console.log('Articles:', articles);// Setelah ini pastikan fetchedArticles adalah array
            } catch (error) {
                setError(error.message);
            }
        };

        fetchArticles();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Sidebar />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' style={{ marginLeft: "150px" }}>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <div key={article.id} className="card p-0 bg-base-100 shadow-xl">
                            <figure>
                                <img src={article.image} alt={article.title} className="w-full" />
                            </figure>
                            <div className="card-body text-center">
                                <h2 className="card-title text-center">{article.title}</h2>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No articles found</p>
                )}
            </div>

        </div>
    );
}

export default Userspage;
