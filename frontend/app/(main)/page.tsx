/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Calendar } from "primereact/calendar";
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { AnimalService } from '../../demo/service/AnimalService';
import { Demo } from '@/types';

interface DropdownItem {
    name: string;
}

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Crud = () => {
    let emptyAnimal: Demo.Animal = {
        id: '',
        name: '',
        description: '',
        imageUrl: '',
        birthDate: '',
        category: '',
        status: '',
        idade: 0
    };

    const [animals, setAnimals] = useState(null);
    const [animalDialog, setAnimalDialog] = useState(false);
    const [deleteAnimalDialog, setDeleteAnimalDialog] = useState(false);
    const [animal, setAnimal] = useState<Demo.Animal>(emptyAnimal);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [calendarValue, setCalendarValue] = useState<any>(null);
    const [dropdownItem, setDropdownItem] = useState<DropdownItem | null>(null);
    const dropdownItems: DropdownItem[] = useMemo(
        () => [
            { name: 'ADOTADO'},
            { name: 'DISPONIVEL'}
        ],
        []
    );


    useEffect(() => {
        AnimalService.getAnimals().then((data) => setAnimals(data as any));
    }, []);


    const openNew = () => {
        setAnimal(emptyAnimal);
        setSubmitted(false);
        setAnimalDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAnimalDialog(false);
    };

    const hideDeleteAnimalDialog = () => {
        setDeleteAnimalDialog(false);
    };

    const hideDeleteAnimalsDialog = () => {
        setDeleteAnimalDialog(false);
    };

    const saveAnimal = () => {
        setSubmitted(true);

        if (animal.name.trim()) {
            let _animals = [...(animals as any)];
            let _animal = { ...animal };
            if (animal.id) {
                const index = findIndexById(animal.id);

                _animals[index] = _animal;
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Animal Updated',
                    life: 3000
                });
            } else {
                
                //persistir no banco

                _animals.push(_animal);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Animal Created',
                    life: 3000
                });
            }

            setAnimals(_animals as any);
            setAnimalDialog(false);
            setAnimal(emptyAnimal);
        }
    };

    const editAnimal = (animal: Demo.Animal) => {
        setAnimal({ ...animal });
        setAnimalDialog(true);
    };

    const confirmDeleteAnimal = (animal: Demo.Animal) => {
        setAnimal(animal);
        setDeleteAnimalDialog(true);
    };

    const deleteAnimal = () => {
        let _animals = (animals as any)?.filter((val: any) => val.id !== animal.id);
        setAnimals(_animals);
        setDeleteAnimalDialog(false);
        setAnimal(emptyAnimal);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Animal Deleted',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (animals as any)?.length; i++) {
            if ((animals as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _animal = { ...animal };
        _animal['category'] = e.value;
        setAnimal(_animal);
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal['name'] = val;

        setAnimal(_animal);
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, description: string) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal['description'] = val;

        setAnimal(_animal);
    };


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
               
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    };

    const nameBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${rowData.imageUrl}`} alt={rowData.imageUrl} className="shadow-2" width="100" />
            </>
        );
    };


    const birthDateBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Data de Nascimento</span>
                {rowData.birthDate}
            </>
        );
    };

    const ageBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Idade</span>
                {rowData.idade}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };


    const statusBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.Animal) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editAnimal(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteAnimal(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciar Animais</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
               
              
            </span>
        </div>
    );

    const animalDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveAnimal} />
        </>
    );
    const deleteAnimalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteAnimalsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteAnimal} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={animals}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                       
                        <Column field="id" header="ID" body={idBodyTemplate}  headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Nome" body={nameBodyTemplate}  headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Imagem" body={imageBodyTemplate}></Column>
                        <Column field="categoria" header="Categoria" body={categoryBodyTemplate}  headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="birthDate" header="Data de Nascimento" body={birthDateBodyTemplate}  ></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate}  headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={animalDialog} style={{ width: '450px' }} header="Animal Details" modal className="p-fluid" footer={animalDialogFooter} onHide={hideDialog}>
                        {animal.imageUrl && <img src={`${animal.imageUrl}`} alt={animal.imageUrl} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={animal.name}
                                onChange={(e) => onNameChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !animal.name
                                })}
                            />
                            {submitted && !animal.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={animal.description} onChange={(e) => onDescriptionChange(e, 'description')} required rows={3} cols={20} />
                        </div>

                        <div className="field">
                            <label htmlFor="birthDate">Data de Nascimento</label>
                            <InputMask value={animal.birthDate} onChange={(e) => setCalendarValue(e.target.value)} mask="99/99/9999" placeholder="dd/mm/aaaa" />
                        </div>

                        <div className="field">
                            <label className="mb-3">Categoria</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="CACHORRO" onChange={onCategoryChange} checked={animal.category === 'CACHORRO'} />
                                    <label htmlFor="category1">Cachorro</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="GATO" onChange={onCategoryChange} checked={animal.category === 'GATO'} />
                                    <label htmlFor="category2">Gato</label>
                                </div>
                            </div>
                        </div>

                        <div className="field">

                        <div className="field col-12 md:col-6">
                            <label htmlFor="state">Status</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems}  optionLabel="name" placeholder="Selecione"></Dropdown>
                        </div>

                        </div>

                       
                    </Dialog>

                    <Dialog visible={deleteAnimalDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteAnimalDialogFooter} onHide={hideDeleteAnimalDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {animal && (
                                <span>
                                    Are you sure you want to delete <b>{animal.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                  
                </div>
            </div>
        </div>
    );
};

export default Crud;
