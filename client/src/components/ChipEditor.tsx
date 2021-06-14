import { Button, Chip, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';

interface Props {
    chips: Array<string>,
    onChange?: (newChips: Array<string>) => void,
    title: string,
    editable?: boolean,
}

export const ChipEditor: React.FC<Props> = ({ chips, onChange, title, editable }) => {

    if (editable === true && onChange === undefined) {
        console.error("ChipEditor editable but no onChange method");
        alert("Error");
    }

    const [editing, setEditing] = useState(false);
    const [editorVal, setEditorVal] = useState(chips.join(", "));

    const onSave = () => {
        let newChips = editorVal.split(", ");
        onChange!!(newChips);
        setEditing(false);
    };

    return <Paper variant="outlined" style={{ padding: "1rem" }}>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-start" }}>
            <h4 style={{ marginTop: '0' }}>{title}</h4>
            {editable && <Button variant="outlined" size="small"
                onClick={() => setEditing(!editing)} style={{ width: "10rem" }}>

                {(editing) ? "Anuluj edycję" : "Edytuj"}

            </Button>}
        </div>

        <div>
            {chips.map((chip, index) => (
                <Chip key={index} label={chip} style={{ marginRight: ".25rem" }} />
            ))}
        </div>

        {editing && <div>
            <br />
            <TextField value={editorVal} onChange={e => setEditorVal(e.target.value)}
                variant="outlined" fullWidth />
            <br /> <br />
            <Button variant="outlined" onClick={() => onSave()}>Zapisz</Button>
        </div>}
    </Paper>;
};