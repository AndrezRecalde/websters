import React, { useEffect, useRef, useState } from "react";
import { Table, Text, Title } from "@mantine/core";
import { useResultsStore } from "../../hooks/useResultsStore";

const WebsterTableConcejales = () => {
    const { resultsConcejales } = useResultsStore();
    const [valores, setValores] = useState([]);
    const divRef_1 = useRef([]);
    const divRef_3 = useRef([]);
    const divRef_5 = useRef([]);
    const divRef_7 = useRef([]);
    let divTot = useRef(0);

    useEffect(() => {
        funTotales();

        return () => {
            setValores([]);
        };
    }, [resultsConcejales]);

    let funTotales = () => {

        resultsConcejales?.some((item) => {
            let div1 = item.total_votos;
            let div3 = parseFloat(item.total_votos / 3).toFixed(2);
            let div5 = parseFloat(item.total_votos / 5).toFixed(2);
            let div7 = parseFloat(item.total_votos / 7).toFixed(2);

            setValores((prev) => [
                ...prev,
                parseFloat(div1),
                parseFloat(div3),
                parseFloat(div5),
                parseFloat(div7),
            ]);
        });
    };

    const rows = resultsConcejales?.map((results, i) => {
        let total_1 = parseFloat(results.total_votos / 1);
        let total_3 = parseFloat(results.total_votos / 3).toFixed(2);
        let total_5 = parseFloat(results.total_votos / 5).toFixed(2);
        let total_7 = parseFloat(results.total_votos / 7).toFixed(2);

        return (
            <tr key={results.idorganizacion}>
                <td>{results.lista}</td>
                <td>{results.nombre}</td>
                <td>{results.total_votos}</td>
                <td>
                    {valores
                        .sort((a, b) => {
                            return b - a;
                        })
                        .slice(0, results.cantidad)
                        .includes(total_1) ? (
                        <div
                            ref={(e) => divRef_1.current.push(e)}
                            onClick={() => boxChange(i, divRef_1)}
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                background: results.color,
                            }}
                        >
                            {total_1}
                        </div>
                    ) : (
                        <div>{total_1}</div>
                    )}
                </td>

                <td>
                    {valores
                        .sort((a, b) => {
                            return b - a;
                        })
                        .slice(0, results.cantidad)
                        .includes(parseFloat(total_3)) ? (
                        <div
                            ref={(e) => divRef_3.current.push(e)}
                            onClick={() => boxChange(i, divRef_3)}
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                background: results.color,
                            }}
                        >
                            {total_3}
                        </div>
                    ) : (
                        <div>{total_3}</div>
                    )}
                </td>

                <td>
                    {valores
                        .sort((a, b) => {
                            return b - a;
                        })
                        .slice(0, results.cantidad)
                        .includes(parseFloat(total_5)) ? (
                        <div
                            ref={(e) => divRef_5.current.push(e)}
                            onClick={() => boxChange(i, divRef_5)}
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                background: results.color,
                            }}
                        >
                            {total_5}
                        </div>
                    ) : (
                        <div>{total_5}</div>
                    )}
                </td>

                <td>
                    {valores
                        .sort((a, b) => {
                            return b - a;
                        })
                        .slice(0, results.cantidad)
                        .includes(parseFloat(total_7)) ? (
                        <div
                            ref={(e) => divRef_7.current.push(e)}
                            onClick={() => boxChange(i, divRef_7)}
                            style={{
                                fontWeight: "bold",
                                color: "black",
                                background: results.color,
                            }}
                        >
                            {total_7}
                        </div>
                    ) : (
                        <div>{total_7}</div>
                    )}
                </td>

                <td>
                    <input
                        disabled
                        id={i}
                        value={divTot.current}
                        type="number"
                        style={{
                            height: "30px",
                        }}
                    />
                </td>
            </tr>
        );
    });

    const boxChange = (i, divs) => {
        let tot = document.getElementById(i).value;
        //console.log(document.getElementById(i).value);
        if (divs.current[i]?.style.fontWeight === "bold") {
            tot++;
        }
        document.getElementById(i).value = tot;
    };

    useEffect(() => {
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                if (divRef_1.current[i]?.style.fontWeight === "bold") {
                    divRef_1.current[i]?.click();
                    divRef_3.current[i]?.click();
                    divRef_5.current[i]?.click();
                    divRef_7.current[i]?.click();
                }
            }
        }, 300);
    }, [resultsConcejales]);

    return (
        <>
            <Title order={3} align="center" mt={50}>
                <Text span c="white" inherit>
                    {resultsConcejales[0].nombre_dignidad.toUpperCase()} -{" "}
                    {resultsConcejales[0].nombre_canton}
                </Text>
            </Title>
            <Table
                mt="md"
                mb="md"
                fontSize="md"
                verticalSpacing="sm"
                striped
                withBorder
                withColumnBorders
            >
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
    );
};

export default WebsterTableConcejales;
