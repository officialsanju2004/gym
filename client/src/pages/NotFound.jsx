import { Link } from 'react-router-dom';
import Scene from '../components/Scenes';
import { useSEO } from '../hooks/useSEO';

export default function NotFound({ what = 'page' }) {
  useSEO({ title: 'Page not found', description: 'The page you are looking for does not exist.' });
  return (
    <section className="min-h-[80vh] grid place-items-center pt-24 px-5 text-center">
      <div>
        <Scene name="empty" className="mx-auto h-auto w-full max-w-[320px]" />
        <p className="font-display font-black text-[5rem] leading-none text-flame">404</p>
        <h1 className="text-5xl mt-2">That {what} does not exist</h1>
        <p className="mt-4 text-mute">The link may be old or mistyped.</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <Link to="/supplements" className="btn-primary">Browse supplements</Link>
          <Link to="/" className="btn-ghost">Go home</Link>
        </div>
      </div>
    </section>
  );
}
