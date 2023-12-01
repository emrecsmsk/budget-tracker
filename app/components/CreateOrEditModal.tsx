import { ChangeEvent, useEffect, useState } from "react"
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import ExpensesReducer from "../redux/reducers/ExpensesReducer";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";
import '../i18n'

interface CreateOrEditModalProps {
    setIsCreateModalOpen: (isOpen: boolean) => void
    selectedId?: number
    selectedMoney?: number
    selectedType?: string
}

const CreateOrEditModal: React.FC<CreateOrEditModalProps> = ({ setIsCreateModalOpen, selectedId, selectedMoney, selectedType }) => {

    const { t } = useTranslation()
    const [id, setId] = useState(0)
    const [money, setMoney] = useState("")
    const [type, setType] = useState("")
    const { user } = useSelector((state: RootState) => state.login)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        const setSelected = () => {
            if (selectedId !== undefined && selectedMoney !== undefined && selectedType !== undefined) {
                setId(selectedId)
                setMoney(selectedMoney.toString())
                setType(selectedType)
            }
        }
        setSelected()
    }, [])


    const handleMoneyChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMoney(e.target.value);
    }

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    }

    const onPressSave = async () => {
        if (selectedId !== undefined && selectedMoney !== undefined && selectedType !== undefined) {
            await dispatch(ExpensesReducer.handleEditExpense(id, type, parseInt(money)))
            setIsCreateModalOpen(false)
        } else {
            await dispatch(ExpensesReducer.handleAddExpense(user!.id, type, parseInt(money)))
            setIsCreateModalOpen(false)
        }
    }

    return (
        <div
            className="flex items-center justify-center"
        >
            <div
                className="w-[500px] h-[600px] bg-white shadow-md flex flex-col items-center rounded-[10px] p-16 justify-evenly"
            >
                <IoMdClose
                    className="relative left-52 bottom-20 text-[#FFD28F] cursor-pointer"
                    size={40}
                    onClick={() => setIsCreateModalOpen(false)}
                />
                <h1
                    className=" text-[#FFD28F] text-[40px]"
                >
                    {t('createOrEdit').toUpperCase()}
                </h1>
                <div className="flex flex-row items-center  w-[80%] ">
                    <input
                        className=" border-[#D9D9D9] border-[1px] rounded-[10px] h-14 w-[100%] pl-2"
                        placeholder={t('money')}
                        value={money}
                        onChange={handleMoneyChange}
                    />
                </div>
                <div className="flex flex-row items-center  w-[80%] ">
                    <select
                        id="underline_select"
                        className="border-[#D9D9D9] border-[1px] rounded-[10px] h-14 pl-2 block py-2.5 px-0 w-full text-lg text-black bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <option selected>{t('type')}</option>
                        <option value="Income">Income</option>
                        <option value="Outcome">Outcome</option>
                    </select>
                    <FaChevronDown
                        className="relative right-10 text-[#D9D9D9] "
                    />
                </div>
                <button
                    className="h-14 w-[80%] bg-[#EC8F5E] rounded-[10px] text-white"
                    onClick={onPressSave}
                >
                    {t('save')}
                </button>
            </div>
        </div>
    )
}

export default CreateOrEditModal