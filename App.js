import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps'; // Используем новые компоненты
import { styles } from './styles';
import { fetchTrafficData } from './mockTraffic';

// Цвета для разных статусов загрузки дорог
const statusColors = {
    free: 'green',
    medium: 'orange',
    jam: 'red',
};

export default function App() {
    const [trafficData, setTrafficData] = useState([]);

    const loadData = async () => {
        const data = await fetchTrafficData();
        setTrafficData(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 55.7558,
                    longitude: 37.6173,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                // Отключаем стандартный слой карты (Google/Apple), чтобы использовать только OSM
                // Это также убирает необходимость в API-ключе[reference:3]
                provider={null}
            >
                {/* Слой с тайлами OpenStreetMap */}
                <UrlTile
                    urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maximumZ={19}
                    shouldReplaceMapContent={true} // Заменяем стандартный слой карты на OSM
                />

                {/* Маркеры для отображения данных о трафике */}
                {trafficData.map((point) => (
                    <Marker
                        key={point.id}
                        coordinate={{
                            latitude: point.latitude,
                            longitude: point.longitude,
                        }}
                        pinColor={statusColors[point.status] || 'gray'} // Цвет маркера
                        onPress={() => {
                            // Всплывающее окно с информацией при нажатии на маркер
                            Alert.alert(
                                point.description,
                                `Статус: ${point.status}\nКоординаты: ${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`
                            );
                        }}
                    />
                ))}
            </MapView>

            {/* Кнопка для обновления данных */}
            <View style={styles.buttonContainer}>
                <Button title="Обновить данные" onPress={loadData} />
            </View>
        </View>
    );
}