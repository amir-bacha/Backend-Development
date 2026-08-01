import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome to my website
                </h1>
            </div>
            <div>
                <ul className="flex flex-col gap-4 sm:flex-row">
                    <li>
                        <Link
                            to="/signup"
                            className="block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors"
                        >
                            Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="block bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/post"
                            className="block bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors"
                        >
                            Write POST
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/viewpost"
                            className="block bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-lg shadow transition-colors"
                        >
                            View POST
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Home