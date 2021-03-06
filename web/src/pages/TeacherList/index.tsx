import React, { useState, FormEvent } from 'react';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';



function TeacherList() {

    const [subject, setSubject] = useState("");
    const [week_day, setWeekDay] = useState("");
    const [time, setTime] = useState("");

    const [teachers, setTeachers] = useState([]);

    const options = [
        { value: "Artes", label: "Artes"},
        { value: "Biologia", label: "Biologia"},
        { value: "Ciências", label: "Ciências"},
        { value: "Educação física", label: "Educação física"},
        { value: "Física", label: "Física"},
        { value: "Geografia", label: "Geografia"},
        { value: "História", label: "História"},
        { value: "Matemática", label: "Matemática"},
        { value: "Português", label: "Português"},
        { value: "Química", label: "Química"},
    ];

    const days = [
        { value: "0", label: "Domingo"},
        { value: "1", label: "Segunda-feira"},
        { value: "2", label: "Terça-feira"},
        { value: "3", label: "Quarta-feira"},
        { value: "4", label: "Quita-feira"},
        { value: "5", label: "Sexta-feira"},
        { value: "6", label: "Sábado"},
    ];

    async function searchTeacher(e: FormEvent) {
        e.preventDefault();

        const res = await api.get('classes', {
            params:{
                subject,
                week_day,
                time
            }
        });

        setTeachers(res.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeacher}>
                    <Select name="subject" value={subject} label="Matéria" options={options} onChange={e => setSubject(e.target.value)}/>
                    <Select name="week_day" value={week_day} label="Dia da semana" options={days} onChange={e => setWeekDay(e.target.value)}/>
                    <Input type="time" value={time} name="time" label="Hora" onChange={e => setTime(e.target.value)}/>
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher}/>
                    })
                }
            </main>
        </div>
    )
}

export default TeacherList;