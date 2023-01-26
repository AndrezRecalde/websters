import React from 'react';
import { Table, Text, Title } from '@mantine/core';
import { useResultsStore } from '../../hooks/useResultsStore';




const WebsterTableJuntas = () => {

    const { resultsJuntasParroquiales } = useResultsStore();


    const boxClick = (i, id, code_color) => {
        var tot = document.getElementById(i).value;
        if(document.getElementsByClassName(id)[i].style.fontWeight === "bold"){
            document.getElementsByClassName(id)[i].removeAttribute("style");
            tot--;
        }else{
            document.getElementsByClassName(id)[i].style.fontWeight = "bold";
            document.getElementsByClassName(id)[i].style.color = "black";
            document.getElementsByClassName(id)[i].style.backgroundColor = code_color;
            document.getElementsByClassName(id)[i].style.padding = "5px";
            tot++;
        }
        document.getElementById(i).value = tot;
    }



    const rows = resultsJuntasParroquiales?.map((results, i) => {
        return(
        <tr key={i}>
            <td>{results.lista}</td>
            <td>{results.nombre}</td>
            <td>{results.total_votos}</td>
            <td><div
             className="div_1" onClick={() => boxClick(i, "div_1", results.color)}>{(results.total_votos / 1)}</div></td>
            <td><div
            className="div_3" onClick={() => boxClick(i, "div_3", results.color)}>{(results.total_votos / 3).toFixed(2)}</div></td>
            <td><div
             className="div_5" onClick={() => boxClick(i, "div_5", results.color)}>{(results.total_votos / 5).toFixed(2)}</div></td>
            <td><div
             className="div_7" onClick={() => boxClick(i, "div_", results.color)}>{(results.total_votos / 7).toFixed(2)}</div></td>
            <td>
                <input disabled id={i} value="0" type="number" />
            </td>

        </tr>
        )
    });

    return (
        <>
            <Title order={3} align="center" mt={50}>
                <Text span c="white" inherit>
                {resultsJuntasParroquiales[0].nombre_dignidad.toUpperCase()} - {" "}
                {resultsJuntasParroquiales[0].nombre_parroquia}
                </Text>
            </Title>
            <Table mt="md" mb="md" fontSize="md" verticalSpacing="sm" striped withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Lista</th>
                        <th>Organización</th>
                        <th>Total Votos</th>
                        <th>1</th>
                        <th>3</th>
                        <th>5</th>
                        <th>7</th>
                        <th>Total Escaños</th>

                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    )
}

export default WebsterTableJuntas
