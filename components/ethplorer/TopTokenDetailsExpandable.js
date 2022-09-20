import React from "react";
import moment from "moment";
import Link from "next/link";
import { getTime } from "@/utils/time";

export default function TopTokenDetailsExpandable({ record }) {
  console.log("TopTokenDetailsExpandable record", record);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Last Updated</th>
            <th>Holders Count</th>
            <th>Transaction Count</th>
            <th>Eth Transfers Count</th>
            <th>Transfers Count</th>
            <th>Reddit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>{getTime(record?.lastUpdated)}</div>
              <div>{moment(getTime(record?.lastUpdated)).fromNow()}</div>
            </td>
            <td>{record?.holdersCount}</td>
            <td>{record?.txsCount}</td>
            <td>{record?.ethTransfersCount}</td>
            <td>{record?.transfersCount}</td>
            <td>
              {record?.reddit && (
                <Link
                  href={`https://www.reddit.com/r/${record?.reddit}`}
                  passHref={true}
                >
                  {record?.reddit}
                </Link>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
