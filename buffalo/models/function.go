package models

import (
	"encoding/json"
	"time"

	"github.com/gobuffalo/nulls"
	"github.com/gobuffalo/pop/v6"
	"github.com/gobuffalo/validate/v3"
	"github.com/gobuffalo/validate/v3/validators"
	"github.com/gofrs/uuid"
)

// Function is used by pop to map your functions database table to your go code.
type Function struct {
	ID        uuid.UUID    `json:"id" db:"id"`
	Name      string       `json:"name" db:"name"`
	Language  string       `json:"language" db:"language"`
	Image     string       `json:"image" db:"image"`
	Source    string       `json:"source" db:"source"`
	Bundle    nulls.String `json:"bundle" db:"bundle"`
	CreatedAt time.Time    `json:"created_at" db:"created_at"`
	UpdatedAt time.Time    `json:"updated_at" db:"updated_at"`
}

// String is not required by pop and may be deleted
func (f Function) String() string {
	jf, _ := json.Marshal(f)
	return string(jf)
}

// Functions is not required by pop and may be deleted
type Functions []Function

// String is not required by pop and may be deleted
func (f Functions) String() string {
	jf, _ := json.Marshal(f)
	return string(jf)
}

// Validate gets run every time you call a "pop.Validate*" (pop.ValidateAndSave, pop.ValidateAndCreate, pop.ValidateAndUpdate) method.
// This method is not required and may be deleted.
func (f *Function) Validate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.Validate(
		&validators.StringIsPresent{Field: f.Name, Name: "Name"},
		&validators.StringIsPresent{Field: f.Language, Name: "Language"},
		&validators.StringIsPresent{Field: f.Image, Name: "Image"},
		&validators.StringIsPresent{Field: f.Source, Name: "Source"},
	), nil
}

// ValidateCreate gets run every time you call "pop.ValidateAndCreate" method.
// This method is not required and may be deleted.
func (f *Function) ValidateCreate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}

// ValidateUpdate gets run every time you call "pop.ValidateAndUpdate" method.
// This method is not required and may be deleted.
func (f *Function) ValidateUpdate(tx *pop.Connection) (*validate.Errors, error) {
	return validate.NewErrors(), nil
}
