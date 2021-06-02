import { List, ListItem, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { FoldingPaper } from './FoldingPaper';
import { NewCarMake } from './NewCarMake';
import { NewCarModel } from './NewCarModel';

interface Props {

}

export interface CarModel {
    name: string,
    variant: string,
    id: number,
}

export interface CarMake {
    name: string,
    id: number,
    carModels: Array<CarModel>,
}

export interface CarInfo {
    carInfo: Array<CarMake>;
}

export const CarModelManagement: React.FC<Props> = ({ }) => {
    const [loading, setLoading] = useState(true);
    const [carInfo, setCarInfo] = useState<CarInfo | null>(null);

    const loadCarInfo = () => {
        axios.get("/api/car/info").then((data) => {
            setCarInfo(data.data.data);
            if (loading) setLoading(false);
        });
    };

    useEffect(() => loadCarInfo(), []);

    const tableInfo = useMemo(() => {
        if (carInfo === null) return null;
        let result = [];
        for (let make of carInfo!.carInfo) {
            for (let model of make.carModels) {
                result.push({
                    makeName: make.name,
                    modelName: model.name,
                    modelVariant: model.variant,
                    modelId: model.id,
                });
            }
        }
        return result;
    }, [carInfo]);

    if (loading) return <FoldingPaper title="Zarządzanie samochodami" />;

    return <FoldingPaper title="Zarządzanie samochodami">
        <h4>Marki samochodów w bazie danych</h4>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Nazwa</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {carInfo!.carInfo.map(it => (
                    <TableRow key={it.id}>
                        <TableCell>{it.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <h4>Modele samochodów w bazie danych</h4>
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Marka</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Wariant</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableInfo!.map(it => (
                    <TableRow key={it.modelId}>
                        <TableCell>{it.makeName}</TableCell>
                        <TableCell>{it.modelName}</TableCell>
                        <TableCell>{it.modelVariant}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <h4>Dodawanie marek</h4>
        <NewCarMake onChange={loadCarInfo} />

        <h4>Dodawanie modeli</h4>
        <NewCarModel onChange={loadCarInfo} carMakes={carInfo!.carInfo} />

    </FoldingPaper>;
};