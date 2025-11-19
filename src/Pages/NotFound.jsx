import { useRouteError, Link } from "react-router-dom";
import error_404Img from '../assets/error-404.png'
import { HeadProvider, Title } from "react-head";



const NotFound = () => {
    const error = useRouteError();
    console.error(error)

    return (
        <div>
            <HeadProvider>
                <Title>GoodHabit | ErrorPage</Title>

            </HeadProvider>

            <div className="h-screen flex flex-col justify-center items-center text-center my-6">

                <div>
                    <img src={error_404Img} alt="" />
                </div>
                <h1 className="text-5xl font-bold mb-4 text-red-600">Oops, page not found!</h1>
                <p className="text-xl mb-2">The page you are looking for is not available.</p>
                <p className="text-gray-500 mb-6">

                </p>

                <Link
                    to="/"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    ⬅ Go Back
                </Link>
            </div>

        </div>
    );
};

export default NotFound;