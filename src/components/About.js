import React from "react";
import { Modal, Button } from "react-bootstrap";

export function About({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Guia Prático: Técnica Pomodoro 🍅</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>🎯 O que é a Técnica Pomodoro?</h5>
        <p>
          A Técnica Pomodoro se baseia em ciclos de trabalho chamados
          "Pomodoros", que são períodos de 25 minutos de foco total seguidos por
          pausas curtas.
        </p>

        <h5>⏳ Como usar a Técnica Pomodoro</h5>
        <ol>
          <li>Escolha uma tarefa que deseja realizar.</li>
          <li>Ajuste um timer para 25 minutos e trabalhe sem interrupções.</li>
          <li>Quando o timer tocar, faça uma pausa de 5 minutos.</li>
          <li>Repita o ciclo por 4 vezes.</li>
          <li>Após 4 Pomodoros, faça uma pausa mais longa (15 a 30 minutos).</li>
        </ol>

        <h5>📌 Dicas para Maximizar a Eficiência</h5>
        <ul>
          <li>Elimine distrações: feche abas desnecessárias e silencie notificações.</li>
          <li>Use fones de ouvido: se estiver em um ambiente barulhento, escute música instrumental.</li>
          <li>Registre seu progresso: anote quantos Pomodoros concluiu para acompanhar sua produtividade.</li>
          <li>Agrupe tarefas similares: isso ajuda a manter o foco sem precisar mudar de contexto constantemente.</li>
        </ul>

        <h5>🚀 Benefícios da Técnica Pomodoro</h5>
        <ul>
          <li>✅ Aumenta o foco e a produtividade.</li>
          <li>✅ Reduz a procrastinação.</li>
          <li>✅ Melhora a gestão do tempo.</li>
          <li>✅ Promove um equilíbrio entre trabalho e descanso.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
