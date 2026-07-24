import { Link } from 'react-router-dom';
import dogImgURL from '../assets/imgs/goodBoy.webp';

function NotFoundPage() {
  return (
    <main className="grid grid-cols-1 flex-1 md:grid-cols-[auto_auto] bg-background gap-4 justify-center items-center p-10">
      <h1 className="sr-only">Error Page</h1>
      <div>
        <div className="text-6xl text-primary tracking-tight font-semibold pb-4 ">
          Page Not Found...
        </div>
        <div className="flex gap-2 pt-2 text-xl text-primary ">
          Kingsley will escort you back:
          <Link
            to={'/'}
            className="text-xl text-primary hover:text-accent underline"
          >
            Home
          </Link>
        </div>
      </div>
      <img
        alt="golden retriever kingsley wearing Blue Jays baseball cap"
        className="size-100 rounded-2xl"
        src={dogImgURL}
      />
    </main>
  );
}

export default NotFoundPage;
