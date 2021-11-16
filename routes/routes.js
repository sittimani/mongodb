const router = require("express").Router()
const controller = require("../service/controller")

router.get("/employees", async(request, response) => {
    const data = await controller.employess()
    response.json(data)
})

router.post("/add-employee", async(request, response) => {
    const data = request.body
    const res = await controller.addEmployee(data)
    response.json(res)
})

router.get("/split-team", async(request, response) => {
    const data = await controller.groupEmployee()
    response.json(data)
})

router.put("/update/:id", async(request, response) => {
    const id = request.params.id
    const body = request.body
    const res = await controller.updateEmployee(id, body)
    response.json(res)
})

router.delete("/delete/:id", async(request, response) => {
    const id = request.params.id
    response.json(await controller.deleteEmployee(id))
})

module.exports = router