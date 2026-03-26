import Event from '../models/Event.js';
import sequelize from '../config/database.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const createGolfTournament = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const content = [
      {
        type: 'alert',
        data: {
          type: 'primary',
          message: '<b>The MtS Halifax Golf Tournament</b> is an annual fundraising event that brings together community teams to support the Mission\'s work of promoting the welfare of seafarers visiting the Port of Halifax.'
        }
      },
      {
        type: 'header',
        data: {
          text: '26th MtS Halifax Golf Tournament (2025)',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Despite the dry weather, this year\'s tournament was successfully conducted and played at the Avon Valley Golf and Country Club on September 9th. Twenty-nine (29) community teams participated to support the Mission\'s work of promoting the welfare of seafarers.'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: '<b>The competition ended with the following results:</b>'
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Team with the lowest score — <b>Bluewater Group</b>',
            'Closest to the Hole – Men – <b>Derek Kostal</b>',
            'Closest to the Hole – Women – <b>Jennifer Holmes</b>',
            'Longest Drive Ladies – <b>Michelle Megannety</b>',
            'Longest Drive Men – <b>Gabe Hartlen</b>',
            'Most Honest Team – <b>Ship Happens/Holmes Maritime Inc.</b>'
          ]
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'A BIG BIG THANK YOU to all participants, donors, volunteers, and Avon management! The moral, financial, and physical support in the smooth conduct of the tournament.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80'
          },
          caption: '2025 Tournament Participants'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80'
          },
          caption: 'Golf Course View'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80'
          },
          caption: 'Team Competition'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=1200&q=80'
          },
          caption: 'Award Ceremony'
        }
      },
      {
        type: 'header',
        data: {
          text: '25th MtS Halifax Golf Tournament (2024)',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'This year\'s tournament at the Avon Valley Golf and Country Club was a very successful event. With 26 teams participating on a bright and sunny day, the players enjoyed their game and were pleased with the efficient conduct of the tournament.'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: '<i>To all the Participants, our Sponsors and Patrons, and MtS Volunteers: THANK YOU! The golf tournament raised a substantial amount, essential to the Mission\'s commitment to better serving the seafarers.</i>'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: '<b>Congratulations to —</b>'
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Best Scoring Team – There was a tie – Horizon Maritimes MEN & Maritime World Logistics',
            'Men\'s Closest to the Hole – Wes McGuire',
            'Women\'s Closest to the Hole – Christina Garon',
            'Men\'s Longest Drive – Serge Dipenta',
            'Women\'s Longest Drive – Sandra Attersley',
            'Most Honest Team – Halifax Employers Association'
          ]
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80'
          },
          caption: '2024 Tournament Teams'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1200&q=80'
          },
          caption: 'Beautiful Golf Course'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80'
          },
          caption: 'Volunteers and Participants'
        }
      },
      {
        type: 'header',
        data: {
          text: '24th MtS Halifax Golf Tournament (2023)',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Twenty-eight community teams enjoyed a fun-filled day of golf at the lovely Avon Valley Golf & Country Club. The course was pristine and the rain held off.'
        }
      },
      {
        type: 'paragraph',
        data: {
          text: '<b>The winners of the day—</b>'
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Ryan O\'Hearn – closest to the pin',
            'Denise McFarlane – closest to the hole (Ladies)',
            'Charlie Doran – longest drive (Men)',
            'Rely On Nutec Canada (first-time tournament participant) – lowest scoring team'
          ]
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'A Big THANK YOU and SHOUT OUT to volunteers, participants, sponsors, and community partners for their presence and generous contributions in cash and in kind. The golf tournament this year was a great success, and this is essential for the Mission\'s ministry to seafarers who deliver 90% of everything to the shores of Halifax and Nova Scotia.'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=1200&q=80'
          },
          caption: '2023 Tournament Success'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=1200&q=80'
          },
          caption: 'Community Support'
        }
      }
    ];

    // Delete existing event if it exists
    await Event.destroy({ where: { url: 'mts-golf-tournament' } });

    const event = await Event.create({
      title: 'MtS Golf Tournament',
      url: 'mts-golf-tournament',
      content: JSON.stringify(content),
      eventDate: null,
      isFeatured: true
    });

    console.log('✅ Golf Tournament event created successfully!');
    console.log('Event ID:', event.id);
    console.log('View at: http://localhost:5173/events/mts-golf-tournament');
    process.exit(0);
  } catch (error) {
    console.error('Error creating event:', error);
    process.exit(1);
  }
};

createGolfTournament();
