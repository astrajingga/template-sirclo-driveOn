import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

const DropdownNav = ({ title, children }) => {
  const router = useRouter();
  const [isDropdown, setDropdown] = useState<boolean>(false);

  useEffect(() => {
    setDropdown(false);
  }, [router.query]);

  const handleOutside = () => {
    if (isDropdown) setDropdown(false);
  }

  return (
    <>
      <div className="dropdown inline ml-4">
        <button
          className="btn dropdown-toggle btn-dropdown"
          type="button"
          onClick={() => setDropdown(!isDropdown)}
        >
          {title}
        </button>
        <div className="dropdown-menu dropdown-menu-right dropdown-merlin" style={{ display: isDropdown ? 'block' : 'none' }}>
          {children}
        </div>
        <div className="bg-outside" style={{ display: isDropdown ? 'block' : 'none' }} onClick={() => handleOutside()}></div>
      </div>
    </>
  )
}

export default DropdownNav;