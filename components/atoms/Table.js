import styled from "styled-components";
import { Table as TableAntd } from "antd";

export const Table = styled(TableAntd)`
  margin-bottom: 3rem;

  thead.ant-table-thead {
    tr {
      th {
        background-color: #296eb3;
        color: ${(props) => props.theme.colors.white};
      }
    }
  }

  tr {
    td {
      font-size: 12px;
    }
  }
`;
