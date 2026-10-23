import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import PageTransition from "../components/tunis/PageTransition";

/**
 * A real 404. Previously any unknown URL silently rendered the homepage at the
 * wrong address, which told neither the visitor nor a crawler that the page
 * did not exist.
 */
const NotFoundPage = () => (
  <PageTransition>
    <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <span
        className="text-[72px] font-extrabold leading-none md:text-[110px]"
        style={{ color: "var(--color-accent)" }}
      >
        404
      </span>
      <h1 className="mt-4 text-[26px] font-extrabold md:text-[34px]">
        That page does not exist.
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-[1.9] text-secondary">
        The link may be out of date, or the address slightly off. The studio’s
        work and services are a click away.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
        <Link to="/" className="tunis-btn h-[46px]">
          Back to home
          <span className="tunis-btn-arrow">
            <FiArrowRight />
          </span>
        </Link>
        <Link
          to="/portfolio"
          className="text-[13px] font-bold uppercase tracking-widest underline-offset-8 hover:underline"
        >
          See selected work
        </Link>
      </div>
    </div>
  </PageTransition>
);

export default NotFoundPage;
