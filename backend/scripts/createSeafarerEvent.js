import Event from '../models/Event.js';
import sequelize from '../config/database.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createSeafarerEvent = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const content = [
      {
        type: 'alert',
        data: {
          type: 'primary',
          message: '<b>25 June of each year is the "Day of the Seafarer"</b>, recognizing the invaluable contribution seafarers make to international trade and the world economy, often at great personal cost to themselves and their families.'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'The Mission to Seafarers Halifax joins the International Maritime Organization (IMO) in the yearly observance of the Day of the Seafarer. This international campaign of IMO pays tribute to over 1.5 million seafarers worldwide for their unique and all-too-often overlooked contribution to the well-being of people and economies participating and benefitting from international trade.'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'For several years, we are joined in our celebration by the Filipino-Canadian friends of the Mission who prepared Filipino food treats. During the Covid-19 pandemic, Tim Horton\'s donuts were delivered to ships or given to seafarers who come to the Mission on shore leave.'
        }
      },
      {
        type: 'header',
        data: {
          text: 'International Day of the Seafarer 2025',
          level: 2
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80'
          },
          caption: 'Day of the Seafarer Campaign'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'This year\'s campaign — <b><i>\'My Harassment-Free Ship\'</i></b>, a bold initiative to promote a culture of respect and zero tolerance for bullying and harassment (IMO).'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'The annual luncheon on Seafarers\' Day includes dine-in meals for visiting seafarers and take-out lunches for regular patrons. The Filipino-Canadian Friends of the Mission prepares Filipino home-cooked food.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80'
          },
          caption: 'Community Luncheon'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80'
          },
          caption: 'Filipino Food Preparation'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80'
          },
          caption: 'Seafarers Gathering'
        }
      },
      {
        type: 'header',
        data: {
          text: 'International Day of the Seafarer 2024',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'The 2024 campaign centred around safety tips at sea. It is important that those who work out at sea also understand the importance of their contribution to making the maritime sector a safer workplace.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80'
          },
          caption: 'Maritime Safety'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'This year, the Mission to Seafarers Halifax along with our Filipino-Canadian friends, community partners, and volunteers celebrated the Day of the Seafarers with a hearty luncheon of Filipino dishes and sweets. Member of Parliament Andy Fillmore graced the celebration with his presence and delivered 2,000 Canada pins, which are given for free to seafarers as souvenirs.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80'
          },
          caption: '2024 Celebration'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80'
          },
          caption: 'Community Gathering'
        }
      },
      {
        type: 'header',
        data: {
          text: 'International Day of the Seafarer 2023',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Per IMO, the 2023 campaign looks at seafarers\' contribution to protecting the marine environment in line with the World Maritime theme "MARPOL at 50 – Our commitment goes on."'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80'
          },
          caption: 'Marine Environment Protection'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Protecting the Marine Environment: View from the Sea',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: '<i>"As a seafarer I not only think – I also act. I protect the ocean. I am sure the first thing every seafarer has is love of the ocean. How can you spend so much time at sea without loving it? Of great importance on this work, is to see all the wildlife are kept well. It is part of our work. Garbage recycling and eco speed are priorities. Every trip I love implementing values to my crew about environmental protection."</i> – Captain Meir Dizraeli, ZIM SHEKOU.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1520483601560-4b97d1fde2f2?w=1200&q=80'
          },
          caption: 'Ocean View from Ship'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: '<i>"One of the best thing I experienced working at sea was seeing its beauty in all parts of the world. It is my privilege to share this existence. We are all connected to sea and we are not the only one who benefit from it so we must preserve and protect it for future generations"</i> – Capt. Leo-mar T. Reginaldo, M.V. NYK METEOR'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1200&q=80'
          },
          caption: 'Maritime Vessel'
        }
      },
      {
        type: 'header',
        data: {
          text: 'International Seafarers Day 2022',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Together with our Filipino-Canadian friends, a luncheon was hosted on 25 June 2022 at the Mission centre. With mostly Filipino dishes prepared by our Fil-Can friends, packed lunches were sold to patrons and guests and funds raised were donated to the Mission. Seafarers who visited the Mission were treated to free lunch.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80'
          },
          caption: '2022 Luncheon'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80'
          },
          caption: 'Community Support'
        }
      }
    ];

    // Delete existing event if it exists
    await Event.destroy({ where: { url: 'day-of-the-seafarer-2025' } });

    const event = await Event.create({
      title: 'Day of the Seafarer 2025',
      url: 'day-of-the-seafarer-2025',
      content: JSON.stringify(content),
      eventDate: null,
      isFeatured: true
    });

    console.log('✅ Day of the Seafarer event created successfully!');
    console.log('Event ID:', event.id);
    console.log('View at: http://localhost:5173/events/day-of-the-seafarer-2025');
    process.exit(0);
  } catch (error) {
    console.error('Error creating event:', error);
    process.exit(1);
  }
};

createSeafarerEvent();
