// ArtistGrid Component to display artist profiles in a styled grid layout
import React from 'react';

export const ArtistGrid: React.FC = () => {
  const artists = [
    { id: 1, name: 'BlackPink', imageUrl: 'https://img2.sbs.co.kr/img/sbs_cms/WE/2020/07/09/WE51833793_ori.jpg' },
    { id: 2, name: 'NewJeans', imageUrl: 'https://d2k5miyk6y5zf0.cloudfront.net/article/MYH/20240617/MYH20240617006400641.jpg' },
    { id: 3, name: 'BTS', imageUrl: 'https://c.files.bbci.co.uk/13295/production/_99458487_bts-2017-ama-backstage-portrait-billboard-1548.jpg' },
    { id: 4, name: 'NCT DREAM', imageUrl: 'https://news.nateimg.co.kr/orgImg/jt/2023/03/14/ea83ba51-ddb2-41b7-9ee6-4f71ac72b157.jpg' },
    
    // 다른 아티스트 추가 가능
  ];

  return (
    <div style={{ margin: '20px auto', width: '90%' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#ff69b4' }}>Artist</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
        {artists.map((artist) => (
          <div
            key={artist.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              overflow: 'hidden',
              textAlign: 'center',
            }}
            onClick={() => console.log(`Navigate to ${artist.name} profile`)}
          >
            <div style={{ width: '100%', height: '150px', overflow: 'hidden', borderRadius: '10px' }}>
              <img
                src={artist.imageUrl}
                alt={artist.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
              />
            </div>
            <div
              style={{
                marginTop: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '10px',
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              {artist.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistGrid;
