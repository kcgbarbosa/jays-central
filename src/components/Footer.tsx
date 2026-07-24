import { Link, NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa6';
import logoURL from '../assets/imgs/logo-bluejays.png';

const navLinks = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Roster', href: '/RosterPage' },
  { id: 3, name: 'Schedule', href: '/SchedulePage' },
];

const resourceLinks = [
  { id: 1, name: 'Official Team Site', href: 'https://www.mlb.com/bluejays' },
  { id: 2, name: 'Tickets', href: 'https://www.mlb.com/bluejays/tickets' },
  { id: 3, name: 'MLB Standings', href: 'https://www.mlb.com/standings' },
];

const linkClass =
  'inline-flex w-fit text-[0.95rem] text-white/85 transition-colors duration-200 hover:font-semibold hover:text-white';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-4 border-accent bg-primary text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 gap-x-8 px-10 py-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex sm:col-span-3 lg:col-span-1 lg:items-center">
          <Link to="/" aria-label="Blue Jays Central home" className="w-fit">
            <img
              alt="Toronto Blue Jays logo"
              src={logoURL}
              className="w-40 brightness-0 invert"
            />
          </Link>
        </div>

        <nav aria-label="Site" className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Explore
          </h2>
          {navLinks.map((link) => (
            <NavLink key={link.id} to={link.href} className={linkClass}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <nav aria-label="Resources" className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Resources
          </h2>
          {resourceLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/60">
            Project
          </h2>
          <a
            href="https://github.com/kcgbarbosa/torontobluejays-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 text-[0.95rem] text-white/85 transition-colors duration-200 hover:font-semibold hover:text-white"
          >
            <FaGithub size={18} />
            Source on GitHub
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-10 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} Blue Jays Central · Built by Kevin-Christian
            Giraldo-Barbosa
          </p>
          <p className="max-w-xl sm:text-right ">
            Independent project. Not affiliated with Major League Baseball or
            the Toronto Blue Jays.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
