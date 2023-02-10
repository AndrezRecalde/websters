import { Container } from "@mantine/core";
import React from "react";
import { useActasStore } from "../../../hooks/useActasStore";
import { GridTableActas } from "./grid/GridTableActas";

export const ResultsTableActas = () => {
    const { actas } = useActasStore();

    return (
        <Container size={1300} mt={20} mb={20}>
            <GridTableActas data={actas ? actas : []} />
        </Container>
    );
};
