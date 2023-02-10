import React, { useEffect, useMemo } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import FilterComponent from "../../../../helpers/FilterComponent";
import { Table } from "@mantine/core";
import { LoaderPage } from "../../../loader/LoaderPage";

createTheme('solarized', {
    text: {
      primary: '#FFF',
      secondary: '#2aa198',
    },
    background: {
      default: '##000000',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

export const GridTableActas = (props) => {

    const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);

    const columns = [
        {
            name: "Canton",
            selector: (row) => row.nombre_canton,
            sortable: true,
            width: "250px",
            wrap: true,
        },
        {
            name: "Parroquia",
            selector: (row) => row.nombre_parroquia,
            sortable: true,
            width: "200px",
            wrap: true,
        },
        {
            name: "Zona",
            selector: (row) => row.nombre_zona,
            sortable: true,
            width: "150px",
            wrap: true,
        },
        {
            name: "Recinto",
            sortable: true,
            width: "350px",
            wrap: true,
            selector: (row) => row.nombre_recinto,
        },
        {
            name: "Junta",
            sortable: true,
            width: "90px",
            selector: (row) => row.junta_string,
        },
        {
            name: "Dignidad",
            sorteable: true,
            wrap: true,
            selector: (row) => row.nombre_dignidad,
        },
    ];

    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] =
        React.useState(false);

    const filteredItems = props.data?.filter(
        (item) =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const ExpandedComponent = ({ data }) => (
        <Table withColumnBorders>
            <thead>
                <tr>
                    <th>Total Huellas</th>
                    <th>Votos Blancos</th>
                    <th>Votos Nulos</th>
                    <th>¿Consistentes?</th>
                    <th>Responsable?</th>

                </tr>
            </thead>
            <tbody>
                <tr key={data.id}>
                    <td>{data.num_validos}</td>
                    <td>{data.num_blancos}</td>
                    <td>{data.num_nulos}</td>
                    <td>{data.cuadrada === 1 ? 'Consistente' : 'Inconsistente'}</td>
                    <td>{data.nombres}</td>

                </tr>
            </tbody>
        </Table>
    );

    useEffect(() => {
		const timeout = setTimeout(() => {
			setRows(props.data);
			setPending(false);
		}, 1600);
		return () => clearTimeout(timeout);
	}, []);

    return (
        <DataTable
            title="Total Actas"
            columns={columns}
            data={filteredItems}
            defaultSortField="Canton"
            striped
            pagination
            subHeader
            subHeaderComponent={subHeaderComponent}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            theme="solarized"
            responsive
            progressPending={pending}
			progressComponent={<LoaderPage />}
        />
    );
};
