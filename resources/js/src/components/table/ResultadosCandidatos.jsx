import { Table, Text, Title } from "@mantine/core";
import React from "react";
import { useResultsStore } from "../../hooks/useResultsStore";

export const ResultadosCandidatos = () => {
    const { resultsCandidatos } = useResultsStore();

    const rows = resultsCandidatos?.map((results, i) => {
        return (
            <tr key={i}>
                <td>{results.lista}</td>
                <td>{results.nombre}</td>
                <td>{results.total_votos}</td>
            </tr>
        )
    })

    return (
        <>
            <Title order={3} align="center" mt={50}>
                <Text span c="white" inherit>
                    {resultsCandidatos[0].nombre_dignidad.toUpperCase()}
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
                        <th>Candidato</th>
                        <th>Total Votos</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
};
