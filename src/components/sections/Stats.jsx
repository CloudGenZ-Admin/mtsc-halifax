import React from 'react';
import { FaShip, FaGlobe, FaUsers, FaHistory } from 'react-icons/fa';
import Reveal from '../common/Reveal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useCounter } from '../../hooks/useCounter';
import { getMediaUrl } from '../../services/payloadApi';

const StatCard = ({ icon: Icon, target, label, description, prefix = "", suffix = "", startAnimation }) => {
  const numericTarget = typeof target === 'number' 
    ? target 
    : parseInt(String(target || '').replace(/[^0-9]/g, '')) || 0;

  const count = useCounter(numericTarget, 2000, startAnimation);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all">
      <div>
        {Icon && <Icon className="text-[26px] text-coral mb-2.5 block" />}
        <div className="text-[34px] font-black text-navy leading-none">
          {prefix}{numericTarget > 0 ? count.toLocaleString() : (target || 0)}{suffix}
        </div>
        <div className="text-[14px] font-semibold text-text-mid mt-1.5">{label}</div>
      </div>
      {description && (
        <div className="text-[13px] font-semibold text-text-mid mt-1">{description}</div>
      )}
    </div>
  );
};

export default function Stats({ data }) {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  const statsImageUrl = getMediaUrl(data?.stats_image, null);
  const rawItems = data?.stats_items || data?.stats_list || [];

  const statsPercentage = data?.stats_percentage;
  const statsPercentageLabel = typeof data?.stats_percentage_label === 'string' 
    ? data.stats_percentage_label 
    : data?.stats_percentage_label?.[0]?.text;

  const icons = [FaShip, FaUsers, FaGlobe, FaHistory];

  return (
    <section className="bg-warm-gray py-20" id="stats">
      <div className="max-w-[1200px] mx-auto px-7" ref={ref}>
        <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-[20px] overflow-hidden aspect-[4/3]">
            {statsImageUrl && (
              <img 
                src={statsImageUrl} 
                alt={data?.stats_image?.alt || "Ships at Port"} 
                className="w-full h-full object-cover" 
              />
            )}
            {(statsPercentage || statsPercentageLabel) && (
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur rounded-xl p-4 px-5">
                {statsPercentage && (
                  <span className="block text-[44px] font-black text-coral leading-none">
                    {statsPercentage}
                  </span>
                )}
                {statsPercentageLabel && (
                  <span className="block text-[13px] font-semibold text-navy mt-1 leading-[1.3] whitespace-pre-line">
                    {statsPercentageLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {rawItems.map((item, idx) => {
              const IconComp = item.icon || icons[idx % icons.length];
              return (
                <StatCard 
                  key={idx}
                  icon={IconComp} 
                  target={item.stat_number ?? item.target ?? 0} 
                  prefix={item.stat_prefix || item.prefix || ""}
                  suffix={item.stat_suffix || item.suffix || ""}
                  label={item.stat_label || item.label || ""} 
                  description={item.stat_description}
                  startAnimation={isVisible} 
                />
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}