import React from 'react';
import { FaShip, FaGlobe, FaUsers, FaHistory } from 'react-icons/fa';
import Reveal from '../common/Reveal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCounter } from '../../hooks/useCounter';

const StatCard = ({ icon: Icon, target, label, prefix = "", suffix = "", startAnimation }) => {
  const count = useCounter(target, 2000, startAnimation);
  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all">
      <Icon className="text-[26px] text-coral mb-2.5 block" />
      <div className="text-[34px] font-black text-navy leading-none">
        {prefix}{target > 0 ? count.toLocaleString() : target}{suffix}
      </div>
      <div className="text-[13px] font-semibold text-text-mid mt-1">{label}</div>
    </div>
  );
};

export default function Stats() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section className="bg-warm-gray py-20" id="stats">
      <div className="max-w-[1200px] mx-auto px-7" ref={ref}>
        <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-[20px] overflow-hidden aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600&q=85" alt="Ships" className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 px-5">
              <span className="block text-[44px] font-black text-coral leading-none">90%</span>
              <span className="block text-[13px] font-semibold text-navy mt-1">of world's goods<br/>transported by sea</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StatCard icon={FaShip} target={7104} label="Operating Ships" startAnimation={isVisible} />
            <StatCard icon={FaGlobe} target={181440} label="Seafarers Worldwide" startAnimation={isVisible} />
            <StatCard icon={FaUsers} target={15} suffix="+" label="Years Supporting Seafarers" startAnimation={isVisible} />
            <StatCard icon={FaHistory} target={160} suffix="+" label="Year Legacy" startAnimation={isVisible} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}