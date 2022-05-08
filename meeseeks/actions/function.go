package actions

import (
	"meeseeks/models"
	"net/http"

	"github.com/gobuffalo/buffalo"
)

// FunctionIndex default implementation.
func FunctionIndex(c buffalo.Context) error {
	var functions []models.Function
	err := models.DB.All(&functions)
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(err))
	}
	c.Set("items", functions)
	c.Set("function", models.Function{})
	return c.Render(http.StatusOK, r.HTML("function/index.plush.html"))
	// return c.Render(http.StatusOK, r.JSON(functions))
}

// FunctionShow default implementation.
func FunctionShow(c buffalo.Context) error {
	id := c.Param("id")
	function := models.Function{}
	err := models.DB.Find(&function, id)
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(err))
	}
	return c.Render(http.StatusOK, r.JSON(&function))
}

// FunctionAdd default implementation.
func FunctionAdd(c buffalo.Context) error {
	function := models.Function{}
	if err := c.Bind(&function); err != nil {
		return err
	}
	err := models.DB.Create(&function)
	if err != nil {
		return c.Render(http.StatusBadRequest, r.JSON(err))
	}
	return c.Redirect(http.StatusTemporaryRedirect, "apiV1FunctionPath()")
	// return c.Render(http.StatusOK, r.JSON(function))
}

// FunctionRun default implementation.
func FunctionRun(c buffalo.Context) error {
	return c.Render(http.StatusOK, r.HTML("function/run.plush.html"))
}
