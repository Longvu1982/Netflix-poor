import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./index.scss";
import HeaderNav from "../headerNav/HeaderNav";
import AxiosInstance from "../../axios/axios";
import { toast } from "react-toastify";

export default function AdminPage() {
    const [users, setUsers] = React.useState([]);
    const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
    const [paginationModel, setPaginationModel] = React.useState({
        pageSize: 30,
        page: 0,
    });
    const [isTableLoading, setTableLoading] = React.useState(false);
    const [rowCount, setRowCounts] = React.useState(1);
    const [userName, setUserName] = React.useState("");

    const columns = [
        { field: "id", sortable: false, filterable: false, headerName: "ID", width: 90 },
        {
            field: "email",
            headerName: "Email",
            sortable: false,
            filterable: false,
            width: 280,
        },
        {
            field: "userName",
            headerName: "Username",
            sortable: false,
            filterable: false,
            width: 200,
            editable: false,
        },
        {
            field: "facebookName",
            headerName: "Display name",
            sortable: false,
            filterable: false,
            width: 250,
            editable: false,
        },
        {
            field: "facebookURL",
            headerName: "Facebook URL",
            sortable: false,
            filterable: false,
            width: 180,
            editable: false,
            renderCell: (params) => {
                return params.formattedValue ? (
                    <a style={{ color: "lightblue", textDecoration: "underline" }} href={params.formattedValue} target="_blank" rel="noreferrer">
                        Link
                    </a>
                ) : (
                    <></>
                );
            },
        },
        {
            field: "phoneNumber",
            headerName: "Phone",
            sortable: false,
            filterable: false,
            width: 150,
            editable: false,
        },
        {
            field: "status",
            headerName: "Status",
            sortable: false,
            filterable: false,
            width: 200,
            editable: false,
            renderCell: (params) => {
                if (params.formattedValue === 0)
                    return (
                        <div style={{ color: "#ff9966", fontWeight: 500 }} target="_blank" rel="noreferrer">
                            Pending
                        </div>
                    );
                return (
                    <div style={{ color: "#339900", fontWeight: 600 }} target="_blank" rel="noreferrer">
                        Approved
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Current Action",
            sortable: false,
            filterable: false,
            width: 200,
            editable: false,
            renderCell: (params) => {
                if (!rowSelectionModel.includes(params.id))
                    return (
                        <div style={{ color: "#ff9966", fontWeight: 500 }} target="_blank" rel="noreferrer">
                            Pending
                        </div>
                    );
                return (
                    <div style={{ color: "#339900", fontWeight: 600 }} target="_blank" rel="noreferrer">
                        Approved
                    </div>
                );
            },
        },
    ];

    const handleClickSave = () => {
        if (disableSaveBtn()) {
            return;
        }
        const usersPayload = users.map((user) => {
            if (rowSelectionModel.includes(user.id)) return { ...user, status: 1 };
            return { ...user, status: 0 };
        });
        setTableLoading(true);
        AxiosInstance.patch("api/managerAllUser", usersPayload)
            .then(() => {
                toast.success("Update status successfully!");
                setUsers(usersPayload);
            })
            .finally(() => setTableLoading(false));
    };

    const disableSaveBtn = () => {
        const userStatuses = users.filter((user) => user.status).map((filtered) => filtered.id);
        return JSON.stringify(userStatuses.sort((a, b) => a - b)) === JSON.stringify(rowSelectionModel.sort((a, b) => a - b));
    };

    React.useEffect(() => {
        setTableLoading(true);
        AxiosInstance.get(`api/getAllUser?pageSize=${30}&&pageNumber=${paginationModel.page + 1}&&username=${userName.trim() ? userName.trim() : "-1"}`)
            .then((res) => {
                const result = res.data;
                setRowCounts(result.total);
                setRowSelectionModel(result.users.filter((item) => item.status === 1)?.map((filterItem) => filterItem.id) ?? []);
                setUsers(result.users);
            })
            .finally(() => {
                setTableLoading(false);
            });
    }, [userName, paginationModel.page]);
    return (
        <div className="admin-page">
            <HeaderNav />
            <div className="admin-container">
                <div className="admin-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.keyCode === 13) {
                                    if (!disableSaveBtn()) {
                                        toast.info("Please click save before changing page!");
                                        return;
                                    }
                                    setUserName(e.target.value);
                                }
                            }}
                            type="text"
                            placeholder="Search by user name"
                        />
                    </div>
                    <div className={`profile_btns ${disableSaveBtn() ? "disabled" : ""}`}>
                        <button disabled={disableSaveBtn()} onClick={handleClickSave}>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
                <Box
                    sx={{
                        height: "calc(100vh - 190px)",
                        width: "100%",
                        backgroundColor: "#040b1b",
                        color: "#fff",
                        borderRadius: "10px",
                        // overflow: "auto",
                        paddingInline: "10px",
                        boxShadow: "rgba(20, 20, 11, 0.6) 0px 7px 35px 0px;",
                    }}
                >
                    <DataGrid
                        rows={users}
                        columns={columns}
                        rowCount={rowCount}
                        loading={isTableLoading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={(model) => {
                            if (!disableSaveBtn()) {
                                toast.info("Please click save before changing page!");
                                return;
                            }
                            setPaginationModel(model);
                        }}
                        paginationMode="server"
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 30,
                                    page: 1,
                                },
                            },
                        }}
                        pageSizeOptions={[30]}
                        checkboxSelection
                        rowSelectionModel={rowSelectionModel}
                        onRowSelectionModelChange={setRowSelectionModel}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    );
}
