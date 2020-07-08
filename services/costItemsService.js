import data from '../data/costitems.json';

const GetCostItems = () => data

const GetById = () => data.filter(x => x.costItemId)

export default CostTypes = {
    GetById,
    GetCostItems
}