import Styles from "styles/Tip.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimney,
  faBlog,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

export default function Tip() {
  return (
    <div className={Styles.Tip}>
      <span>
        <Link href={"/"}>
          <a>
            <FontAwesomeIcon icon={faHouseChimney} width={40} height={40} />
          </a>
        </Link>
      </span>
      <span>
        <Link href={"/blog"}>
          <a>
            <FontAwesomeIcon icon={faBlog} width={40} height={40} />
          </a>
        </Link>
      </span>
      <span>
        <Link href={"/blog/tags"}>
          <a>
            <FontAwesomeIcon icon={faTags} width={40} height={40} />
          </a>
        </Link>
      </span>
    </div>
  );
}
