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
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';

import { Demo } from '@/types';

import { useAnimalData } from './hooks/useAnimalData';
import { useAnimalMutate,useAnimalMutatePut } from './hooks/useAnimalMutate';
import { AnimalData } from './interfaces/animal-data';

interface DropdownItem {
    name: string;
}

/* @todo Used 'as any' for types here. Will fix in next version due to onSelectionChange event type issue. */
const Crud = () => {
    let emptyAnimal:AnimalData = {
        id: 0,
        name: '',
        description: '',
        imageUrl: '',
        birthDate: '',
        category: '',
        status: '',
        idade: 0
    };

    // Create a animal
    const { data, isLoading } = useAnimalData();
    const { mutate:mutatePost, isSuccess:isSuccessPost, isPending } = useAnimalMutate();
    const { mutate:mutatePut, isSuccess:isSuccessPut} = useAnimalMutatePut();

    const [animals, setAnimals] = useState(null);
    const [animalDialog, setAnimalDialog] = useState(false);
    const [alterarStatusAnimalDialog, setAlterarStatusAnimalDialog] = useState(false);
    const [animal, setAnimal] = useState<AnimalData>(emptyAnimal);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);


    /** 
    useEffect(() => {
        AnimalService.getAnimalsJSON().then((data) => setAnimals(data as any));
    }, []);
    */


    const openNew = () => {
        setAnimal(emptyAnimal);
        setSubmitted(false);
        setAnimalDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAnimalDialog(false);
    };

    const hideAlterareAnimalDialog = () => {
        setAlterarStatusAnimalDialog(false);
    };

    const hideDeleteAnimalsDialog = () => {
        setAlterarStatusAnimalDialog(false);
    };

    const saveAnimal = () => {
        setSubmitted(true);

        if (animal.name.trim()) {
       
              
                const dataPersist = {
                    "id": animal.id,
                    "name": animal.name,
                    "description": animal.description,
                    "imageUrl": animal.imageUrl,
                    "birthDate": animal.birthDate,
                    "idade": 0,
                    "category": animal.category,
                    "status": animal.status 
                }

                mutate(dataPersist);

                if(isSuccess){
                    
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Animal Created',
                        life: 3000
                    });
                }

            setAnimalDialog(false);
            setAnimal(emptyAnimal);
        }
    };

    /**
    const editAnimal = (animal: AnimalData) => {
        setAnimal({ ...animal });
        setAnimalDialog(true);
    }; */

    const confirmAlterarStatusAnimal = (animal: AnimalData) => {
        setAnimal(animal);
        setAlterarStatusAnimalDialog(true);
    };

    const alterarStatusAnimal = () => {
        setSubmitted(true);

        const dataPersist = {
            "id": animal.id,
            "name": animal.name,
            "description": animal.description,
            "imageUrl": animal.imageUrl,
            "birthDate": animal.birthDate,
            "idade": 0,
            "category": animal.category,
            "status": animal.status == 'ADOTADO' ? 'DISPONIVEL' : 'ADOTADO' 
        }

        mutatePut(dataPersist);

        if(isSuccessPut){

            toast.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Status Alterado',
                life: 3000
            });
        }

        setAlterarStatusAnimalDialog(false);
        setAnimal(emptyAnimal); 
    };

    const onCategoryChange = (e: RadioButtonChangeEvent) => {
        let _animal = { ...animal };
        _animal['category'] = e.value;
        setAnimal(_animal);
    };

    const onStatusChange = (e: RadioButtonChangeEvent) => {
        let _animal = { ...animal };
        _animal['status'] = e.value;
        setAnimal(_animal);
    };

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal['name'] = val;

        setAnimal(_animal);
    };

    const onImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal['imageUrl'] = val;

        setAnimal(_animal);
    };

    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>, description: string) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal['description'] = val;

        setAnimal(_animal);
    };

    const onBirthDateChange = (e: InputMaskChangeEvent, birthDate: string) => {
        const val = (e.target && e.target.value) || '';
        let _animal = { ...animal };
        _animal['birthDate'] = val;

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

    const idBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.id}
            </>
        );
    };

    const nameBodyTemplate = (rowData:AnimalData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const descricaoBodyTemplate = (rowData:AnimalData) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.description}
            </>
        );
    };

    const imageBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={`${rowData.imageUrl}`} alt={rowData.imageUrl} className="shadow-2" width="100" />
            </>
        );
    };


    const birthDateBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                <span className="p-column-title">Data de Nascimento</span>
                {rowData.birthDate}
            </>
        );
    };

    const idadeBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                <span className="p-column-title">Idade</span>
                {rowData.idade}
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

    const categoryBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    };


    const statusBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>
            </>
        );
    };

    const actionBodyTemplate = (rowData: AnimalData) => {
        return (
            <>
                {/* <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editAnimal(rowData)} />*/} 
              
                <Button icon="pi pi-check-square" rounded severity="warning" onClick={() => confirmAlterarStatusAnimal(rowData)} />
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
    const alterarStatusAnimalDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteAnimalsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={alterarStatusAnimal} />
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
                        value={data}
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
                        <Column field="descricao" header="Descrição" body={descricaoBodyTemplate}  headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Imagem" body={imageBodyTemplate}></Column>
                        <Column field="categoria" header="Categoria" body={categoryBodyTemplate}  headerStyle={{ minWidth: '10rem' }}></Column>
                        <Column field="birthDate" header="Data de Nascimento" body={birthDateBodyTemplate}  ></Column>
                        <Column field="idade" header="Idade" body={idadeBodyTemplate}  ></Column>
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
                            {submitted && !animal.name && <small className="p-invalid">Nome é obrigatorio.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={animal.description} onChange={(e) => onDescriptionChange(e, 'description')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="imageUrl">Imagem URL</label>
                            <InputText
                                id="imageUrl"
                                value={animal.imageUrl}
                                onChange={(e) => onImageUrlChange(e, 'imageUrl')}
                            />
                        </div>       
                        <div className="field">
                            <label htmlFor="birthDate">Data de Nascimento</label>
                            <InputMask  value={animal.birthDate} 
                                        slotChar='dd/mm/yyyy' mask="99/99/9999" placeholder="dd/mm/aaaa"
                                        onChange={(e) => onBirthDateChange(e, 'birthDate')} />
                        </div>

                        <div className="field">
                            <label className="mb-3">Categoria</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1"  name="category"  value="CACHORRO" onChange={onCategoryChange} checked={animal.category === 'CACHORRO'}  
                                    required
                                   
                                    className={classNames({
                                        'p-invalid': submitted && !animal.category
                                    })} />
                                    <label htmlFor="category1">Cachorro</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2"   name="category" value="GATO" onChange={onCategoryChange} checked={animal.category === 'GATO'}  
                                    required
                                    
                                    className={classNames({
                                        'p-invalid': submitted && !animal.category
                                    })} />
                                    <label htmlFor="category2">Gato</label>
                                </div>
                                {submitted && !animal.name && <small className="p-invalid">Categoria é obrigatoria.</small>}
                            </div>
                        </div>

                        <div className="field">
                            <label className="mb-3">Status</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="status1" name="status" value="ADOTADO" onChange={onStatusChange} checked={animal.status === 'ADOTADO'}  />
                                    <label htmlFor="status1">Adotado</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="status2" name="status" value="DISPONIVEL" onChange={onStatusChange} checked={animal.status === 'DISPONIVEL'} />
                                    <label htmlFor="status2">Disponivel</label>
                                </div>

                                {submitted && !animal.status && <small className="p-invalid">OBS: O status será definido para DISPONIVEL.</small>}
                            </div>
                        </div>

                       
                    </Dialog>

                    <Dialog visible={alterarStatusAnimalDialog} style={{ width: '450px' }} header="Confirmar" modal footer={alterarStatusAnimalDialogFooter} onHide={hideAlterareAnimalDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {animal && (
                                <span>
                                    Alterar o status de <b>{animal.status}</b> para <b>{animal.status == 'ADOTADO' ? 'DISPONIVEL' : 'ADOTADO' }</b>?
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
