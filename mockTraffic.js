export const fetchTrafficData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: '1',
                    latitude: 55.7600,
                    longitude: 37.6200,
                    status: 'free',
                    description: 'Ленинградский проспект',
                },
                {
                    id: '2',
                    latitude: 55.7500,
                    longitude: 37.6100,
                    status: 'medium',
                    description: 'Тверская улица',
                },
                {
                    id: '3',
                    latitude: 55.7700,
                    longitude: 37.6300,
                    status: 'jam',
                    description: 'Садовое кольцо',
                },
                {
                    id: '4',
                    latitude: 55.7400,
                    longitude: 37.6000,
                    status: 'free',
                    description: 'Кутузовский проспект',
                },
            ]);
        }, 500);
    });
};