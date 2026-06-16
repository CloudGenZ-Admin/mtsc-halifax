import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Package, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import logo from "@/assets/logo.jpeg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/whoweare", label: "Who We Are" },
  { to: "/support", label: "Seafarer Support" },
  { to: "/WaystoGive", label: "Get Involved" },

  {
    to: "/publication",
    label: "Publications",
    subItems: [
      { to: "/publication#halifax-newsletters", label: "Mission to Seafarers Halifax Flying Angel Newsletters" },
      { to: "/publication#the-sea", label: "Mission to Seafarers The Sea Newsletters" },
      { to: "/publication#fan", label: "Mission to Seafarers Flying Angel News (FAN)" },
      { to: "/publication#mts-statistics", label: "MtS Halifax Statistics" },
      { to: "/publication#happiness-index", label: "Seafarers Happiness Index" },
      { to: "/publication#esg-strategy", label: "Mission to Seafarers ESG Strategy" },
      { to: "/publication#foghorn", label: "The Foghorn – Master Mariners of Canada, Maritimes Division" },
      { to: "/publication#marine-safety", label: "Marine Safety Handbook" },
      { to: "/publication#mental-health", label: "The Mental Health of Seafarers in Canada During Covid 19 Pandemic" }
    ]
  },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [donateDialogOpen, setDonateDialogOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu and reset accordion when route changes
  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [location.pathname, location.hash]);

  // Handle clicking outside of the header to close the mobile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpen(false);
        setMobileExpanded(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileAccordion = (label) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-white/80 backdrop-blur"
      }`}
    >
      {/* Header height: Adjusted so 1024px (lg) gets a very tall header for the big tablet logo. Drops back to normal on Desktop (xl:h-28) */}
      <div className="w-full max-w-[1600px] mx-auto px-4 max-[375px]:px-2 md:px-6 lg:px-8 flex h-38 max-[375px]:h-24 sm:h-40 md:h-44 lg:h-48 xl:h-32 items-center justify-between gap-4 max-[375px]:gap-2">

        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-2 max-[375px]:gap-1 sm:gap-4 group shrink-0">
          <img
            src={logo}
            alt="Mission to Seafarers Logo"
            /* HUGE on 1024px (lg:h-44). Normal on actual desktop (xl:h-20 2xl:h-24). Shrunk below 375px */
            className="h-36 max-[375px]:h-20 sm:h-36 md:h-44 lg:h-46 xl:h-30 2xl:h-30 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform"
          />
          <span className="flex flex-col justify-center">
            {/* Massive text for 1024px (lg:32px). Normal for Desktop (xl:18px 2xl:20px). Shrunk below 375px */}
            <span className="text-[16px] max-[375px]:text-[13px] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[22px] 2xl:text-[26px] font-extrabold text-navy whitespace-nowrap leading-none tracking-tight">
              Mission to Seafarers
            </span>
            {/* Massive subtext for 1024px (lg:20px). Normal for Desktop (xl:13px). Shrunk below 375px */}
            <span className="text-[16px] max-[375px]:text-[11px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[22px] font-bold uppercase tracking-[0.18em] text-coral mt-1 max-[375px]:mt-0.5 sm:mt-1.5 whitespace-nowrap leading-none">
              Halifax
            </span>
          </span>
        </Link>

        {/* Desktop Navigation - Shifted to 'xl' (1280px) so 1024px screens get the tablet menu! */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-3">
          {nav.map((n) => (
            n.subItems ? (
              <div key={n.to} className="relative group flex items-center">
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-2 py-2 text-[12px] 2xl:text-[14px] font-semibold whitespace-nowrap rounded-md transition-colors ${
                      isActive || location.pathname.includes(n.to) ? "text-coral" : "text-navy hover:text-coral"
                    }`
                  }
                >
                  {n.label}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 shrink-0 mt-[1px]" />
                </NavLink>

                {/* Desktop Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-80 bg-white rounded-xl shadow-card border border-border p-2 flex flex-col gap-1">
                    {n.subItems.map((sub) => (
                      <NavLink
                        key={sub.to}
                        to={sub.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-normal leading-snug ${
                            isActive ? "bg-coral-pale text-coral" : "text-text-mid hover:text-navy hover:bg-warm-gray"
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `px-2 py-2 text-[12px] 2xl:text-[14px] font-semibold whitespace-nowrap rounded-md transition-colors flex items-center ${
                    isActive ? "text-coral" : "text-navy hover:text-coral"
                  }`
                }
              >
                {n.label}
              </NavLink>
            )
          ))}
        </nav>

        {/* Desktop CTA Buttons - Shifted to 'xl' */}
        <div className="hidden xl:flex items-center gap-2 2xl:gap-3 shrink-0">
          <Button asChild variant="outline" size="sm" className="border-border bg-warm-gray text-navy hover:bg-navy hover:text-white font-bold whitespace-nowrap text-xs 2xl:text-sm px-3 2xl:px-4 h-10">
            <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <Package className="w-4 h-4 mr-2 shrink-0 hidden 2xl:block" />
              <span className="hidden 2xl:inline">Seafarer Parcel Pickup Service</span>
              <span className="2xl:hidden">Parcel Pickup</span>
            </a>
          </Button>

         

          <Button
            onClick={() => setDonateDialogOpen(true)}
            size="lg"
            className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm hover:shadow-warm-hover px-5 2xl:px-6 text-sm 2xl:text-base whitespace-nowrap cursor-pointer h-10 2xl:h-11"
          >
            Donate
          </Button>
        </div>

        {/* Mobile/Tablet Menu Toggle - Now active up to 1279px (xl) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden p-2 max-[375px]:p-1 -mr-2 rounded-md text-navy hover:bg-warm-gray shrink-0 transition-colors"
        >
          {open ? <X className="h-8 w-8 max-[375px]:h-6 max-[375px]:w-6 md:h-10 md:w-10" /> : <Menu className="h-8 w-8 max-[375px]:h-6 max-[375px]:w-6 md:h-10 md:w-10" />}
        </button>
      </div>

      {/* Mobile/Tablet Navigation Drawer */}
      {open && (
        <div className="xl:hidden border-t border-border bg-white animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl absolute w-full left-0">
          <div className="px-5 sm:px-8 lg:px-12 py-6 flex flex-col gap-2 max-h-[85vh] overflow-y-auto pb-10">
            {nav.map((n) => (
              <div key={n.to} className="flex flex-col">
                {n.subItems ? (
                  <>
                    <button
                      onClick={() => toggleMobileAccordion(n.label)}
                      className={`px-4 py-3 md:py-4 text-base md:text-xl font-semibold rounded-lg flex items-center justify-between w-full text-left transition-colors ${
                        location.pathname.includes(n.to) ? "bg-coral-pale text-coral" : "text-navy hover:bg-warm-gray"
                      }`}
                    >
                      {n.label}
                      <ChevronDown
                        className={`w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-300 ${
                          mobileExpanded === n.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileExpanded === n.label ? "max-h-[800px] opacity-100 mt-1" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col gap-1 pl-4 border-l-2 border-warm-gray ml-3 md:ml-4 mb-2">
                        {n.subItems.map((sub) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            className={({ isActive }) =>
                              `px-3 py-2.5 md:py-3 text-sm md:text-lg font-medium rounded-md transition-colors leading-snug ${
                                isActive ? "text-coral font-bold bg-coral-pale/50" : "text-text-mid hover:text-navy hover:bg-warm-gray"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={n.to}
                    end={n.to === "/"}
                    className={({ isActive }) =>
                      `px-4 py-3 md:py-4 text-base md:text-xl font-semibold rounded-lg transition-colors ${
                        isActive ? "bg-coral-pale text-coral" : "text-navy hover:bg-warm-gray"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                )}
              </div>
            ))}

            {/* Mobile/Tablet CTAs */}
            <div className="flex flex-col gap-3 md:gap-4 pt-6 border-t border-gray-100 mt-2">
              <Button asChild variant="outline" className="border-2 border-border bg-warm-gray text-navy font-bold w-full justify-center h-12 md:h-16 md:text-lg rounded-xl">
                <a href="https://parcelservice.mtsc.ca/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Package className="w-5 h-5 md:w-6 md:h-6 mr-2 shrink-0" />
                  Seafarer Parcel Pickup Service
                </a>
              </Button>
           
              <Button
                onClick={() => {
                  setDonateDialogOpen(true);
                  setOpen(false);
                }}
                className="bg-coral hover:bg-coral-light text-white font-extrabold w-full text-lg md:text-xl h-14 md:h-16 rounded-xl"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FULLY RESPONSIVE DONATE DIALOG POPUP */}
      <Dialog open={donateDialogOpen} onOpenChange={setDonateDialogOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[95vw] lg:max-w-[1200px] w-full h-[95vh] md:h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl"
        >
          <DialogHeader className="p-4 md:p-5 shrink-0 border-b bg-white shadow-sm z-10 flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-extrabold text-navy">
              <Gift className="h-5 w-5 text-coral shrink-0" />
              Secure Donation Form
            </DialogTitle>

            <button
              onClick={() => setDonateDialogOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-navy hover:bg-gray-100 rounded-full transition-colors focus:outline-none shrink-0"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          </DialogHeader>

          <div className="flex-1 overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-50/80 flex flex-col">
            <div className="w-full flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm relative">
              <iframe
                src="https://www.canadahelps.org/en/dn/42880"
                title="CanadaHelps Secure Donation Form"
                className="absolute inset-0 w-full h-full border-none bg-transparent"
                allow="payment"
              ></iframe>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default SiteHeader;