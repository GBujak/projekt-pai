import { Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { moneyFormat } from '../util/moneyFormat';
import { ServiceComment, WorkDescription } from '../views/ServiceHistoryView';
import { FoldingPaper } from './FoldingPaper';

interface Props {
    comment: ServiceComment,
}

export const accountTypeDescription = {
    "customer": "klient",
    "mechanic": "mechanik",
    "manager": "kierownik",
    "admin": "administrator",
};

export const ServiceHistoryComment: React.FC<Props> = ({ comment }) => {

    return <FoldingPaper title={comment.title} subtitle={new Date(comment.submittedOn).toLocaleDateString()} startOpen={true}>
        <Typography variant="body2">Autor: {comment.submitter} ({(accountTypeDescription as any)[comment.accountType]})</Typography>
        <Divider style={{ margin: "1rem 0" }} />

        <pre>
            <Typography variant="body1">{comment.content}</Typography>
        </pre>

        {comment.workDescriptions.length !== 0 && <div>
            <div style={{ height: "2rem" }} />
            <Typography variant="overline">Opis pracy</Typography>
            <Divider />
            <Table size="small">
                <TableHead><TableRow>
                    <TableCell>Nazwa pracy</TableCell>
                    <TableCell>Godziny pracy</TableCell>
                    <TableCell>Zużyte części</TableCell>
                </TableRow></TableHead>
                <TableBody>
                    {comment.workDescriptions.map((description, index) => (
                        <TableRow key={index}>
                            <TableCell>{description.name}</TableCell>
                            <TableCell>{description.hours}</TableCell>
                            <TableCell>
                                {description.usedParts.length === 0 ? "nie dotyczy" : <Table size="small">
                                    <TableBody>
                                        {description.usedParts.map((part, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{part.name}</TableCell>
                                                <TableCell>{part.ammount} x {moneyFormat(part.price)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>}

    </FoldingPaper>;
};