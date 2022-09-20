/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Text } from "@/components/atoms";

const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <div>
          {image && (
            <img
              src={`https://ethplorer.io/${image}`}
              alt={record.name}
              width={36}
              height={36}
            />
          )}
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },

    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => <span>{symbol}</span>,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <>
          {price?.rate && (
            <>
              <span>{price?.currency === "USD" ? "$" : price?.rate}</span>
              <span>{price?.rate?.toFixed(7)}</span>
            </>
          )}
        </>
      ),
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <Link href={`/address/${address}`}>
          <a>
            <Text width="150px" truncate title={address}>
              {address}
            </Text>
          </a>
        </Link>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => (
        <Link href={`/address/${owner}`}>
          <a>
            <Text width="150px" truncate title={owner}>
              {owner}
            </Text>
          </a>
        </Link>
      ),
    },
    {
      title: "Total Supply",
      dataIndex: "totalSupply",
      key: "totalSupply",
      render: (totalSupply) => <span>{totalSupply}</span>,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (website) => (
        <>
          {website && (
            <Link href={website} passHref={true}>
              {website}
            </Link>
          )}
        </>
      ),
    },
    {
      title: "Twitter",
      dataIndex: "twitter",
      key: "twitter",
      render: (twitter) => (
        <>
          {twitter && (
            <Link href={`https://twitter.com/${twitter}`} passHref={true}>
              {twitter}
            </Link>
          )}
        </>
      ),
    },
  ];

  export { columns} ;